import { FormEvent, useMemo, useState } from 'react';

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const starterPrompts = [
  'What does interception mean in plain training language?',
  'Give me a focused drill from Bruce Lee\'s Fighting Method for lead-hand timing.',
  'How should I journal a session using only the approved sources?',
  'What conditioning ideas repeat across Bruce Lee\'s fitness notes?'
];

const initialMessage: ChatMessage = {
  id: 'assistant-intro',
  role: 'assistant',
  content:
    'Ask from the approved source set only. If the source set is not enough, this console will say so directly rather than filling gaps.'
};

const apiUrl = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const SifuConsole: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('Ready for disciplined questions.');

  const promptButtons = useMemo(() => starterPrompts, []);

  const runPrompt = async (prompt: string) => {
    if (isLoading) {
      return;
    }

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId('user'),
      role: 'user',
      content: trimmedPrompt
    };
    const assistantMessageId = createId('assistant');

    const nextMessages = [
      ...messages,
      userMessage,
      { id: assistantMessageId, role: 'assistant' as const, content: '' }
    ];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    setStatusText('Consulting the virtual sifu...');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.content.trim())
            .map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok || !response.body) {
        const fallbackError = await response.text();
        throw new Error(fallbackError || 'The chat endpoint did not return a stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        assistantText += decoder.decode(value, { stream: true });
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? { ...message, content: assistantText }
              : message
          )
        );
      }

      if (!assistantText.trim()) {
        throw new Error('The virtual sifu returned an empty response.');
      }

      setStatusText('Response complete.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown console error.';
      setMessages((currentMessages) =>
        currentMessages.map((entry) =>
          entry.id === assistantMessageId
            ? {
                ...entry,
                content:
                  'The virtual sifu is unavailable right now. Check AI Gateway setup and run a Vercel-compatible API server.\n\nDetails: ' + message
              }
            : entry
        )
      );
      setStatusText('Console unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await runPrompt(input);
  };

  return (
    <section className="martial-card sifu-console component-full-width">
      <div>
        <p className="section-kicker">Virtual Sifu Console</p>
        <h2>Ask inside the canon</h2>
        <p className="sifu-status">{statusText}</p>
      </div>

      <div className="sifu-prompt-row">
        {promptButtons.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="prompt-chip-button"
            onClick={() => void runPrompt(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="sifu-messages" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`sifu-message ${message.role}`}>
            <div className="sifu-message-header">
              <span>{message.role === 'assistant' ? 'Sifu' : 'Student'}</span>
            </div>
            <p>{message.content || '...'}</p>
          </article>
        ))}
      </div>

      <form className="console-form" onSubmit={handleSubmit}>
        <textarea
          className="console-textarea"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about doctrine, drills, timing, or daily discipline from the approved Bruce Lee source set."
          disabled={isLoading}
        />
        <div className="console-actions">
          <span className="console-hint">Defaults to {apiUrl} and expects an AI Gateway-backed stream.</span>
          <button className="console-submit" type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Consulting...' : 'Ask The Sifu'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SifuConsole;