import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

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

interface RecognitionEvent {
  results: ArrayLike<{
    0: {
      transcript: string;
    };
    isFinal: boolean;
  }>;
}

interface RecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): RecognitionLike;
}

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
    SpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function extractErrorMessage(rawText: string) {
  try {
    const parsed = JSON.parse(rawText) as { error?: string };
    return parsed.error || rawText;
  } catch {
    return rawText;
  }
}

const SifuConsole: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('Ready for disciplined questions.');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const lastSpokenMessageId = useRef<string>('');

  const promptButtons = useMemo(() => starterPrompts, []);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(apiUrl, { method: 'GET' });
        if (!response.ok) {
          setStatusText('Chat endpoint reachable, but health check failed.');
          return;
        }

        const payload = (await response.json()) as {
          ok?: boolean;
          hasGatewayKey?: boolean;
        };

        if (!payload.ok) {
          setStatusText('Chat endpoint did not confirm readiness.');
          return;
        }

        if (!payload.hasGatewayKey) {
          setStatusText('Gateway key missing on the server.');
          return;
        }

        setStatusText('Sifu console online.');
      } catch {
        setStatusText('Chat endpoint not reachable from this deployment.');
      }
    })();

    const recognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionApi) {
      return;
    }

    const recognition = new recognitionApi();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event: RecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim();

      setInput(transcript);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setStatusText('Voice capture interrupted.');
    };

    recognitionRef.current = recognition;
    setVoiceSupported(true);

    return () => {
      recognition.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!autoSpeak) {
      return;
    }

    const latestAssistantMessage = [...messages]
      .reverse()
      .find((message) => message.role === 'assistant' && message.content.trim());

    if (!latestAssistantMessage) {
      return;
    }

    if (latestAssistantMessage.id === initialMessage.id) {
      return;
    }

    if (latestAssistantMessage.id === lastSpokenMessageId.current) {
      return;
    }

    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(latestAssistantMessage.content);
    utterance.rate = 0.96;
    utterance.pitch = 0.88;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    lastSpokenMessageId.current = latestAssistantMessage.id;
  }, [autoSpeak, messages]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setStatusText('Voice commands are not available in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setStatusText('Voice capture stopped.');
      return;
    }

    recognition.start();
    setIsListening(true);
    setStatusText('Listening for your question...');
  };

  const speakLastAnswer = () => {
    const latestAssistantMessage = [...messages]
      .reverse()
      .find((message) => message.role === 'assistant' && message.content.trim());

    if (!latestAssistantMessage || !window.speechSynthesis) {
      setStatusText('Speech playback is not available here.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(latestAssistantMessage.content);
    utterance.rate = 0.96;
    utterance.pitch = 0.88;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    lastSpokenMessageId.current = latestAssistantMessage.id;
    setStatusText('Speaking the latest answer.');
  };

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
    window.speechSynthesis?.cancel();

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
        throw new Error(extractErrorMessage(fallbackError) || 'The chat endpoint did not return a stream.');
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
                  'The virtual sifu is unavailable right now.\n\nDetails: ' + message
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
      <div className="sifu-console-header">
        <div>
          <p className="section-kicker">Virtual Sifu Console</p>
          <h2>Ask inside the canon</h2>
          <p className="sifu-status">{statusText}</p>
        </div>
        <div className="sifu-control-bank">
          <button type="button" className="voice-action-button" onClick={toggleListening}>
            {isListening ? 'Stop Voice' : 'Voice Input'}
          </button>
          <button type="button" className="voice-action-button" onClick={speakLastAnswer}>
            Speak Reply
          </button>
          <button
            type="button"
            className={`voice-action-button ${autoSpeak ? 'active' : ''}`}
            onClick={() => setAutoSpeak((current) => !current)}
          >
            Auto Voice {autoSpeak ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      <div className="sifu-console-banner">
        <div>
          <span className="console-label">Gateway</span>
          <strong>Vercel AI Gateway</strong>
        </div>
        <div>
          <span className="console-label">Model</span>
          <strong>openai/gpt-5.4</strong>
        </div>
        <div>
          <span className="console-label">Voice</span>
          <strong>{voiceSupported ? 'Browser ready' : 'Browser unavailable'}</strong>
        </div>
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
          placeholder="Ask about doctrine, drills, timing, fitness notes, or daily discipline from the approved Bruce Lee source set."
          disabled={isLoading}
        />
        <div className="console-actions">
          <span className="console-hint">Server-side AI Gateway key is used by {apiUrl}. The browser never receives the secret directly.</span>
          <button className="console-submit" type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Consulting...' : 'Ask The Sifu'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SifuConsole;