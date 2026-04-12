import { streamText } from 'ai';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages?: IncomingMessage[];
}

function normalizeBody(body: unknown): ChatRequestBody {
  if (typeof body === 'string') {
    return JSON.parse(body) as ChatRequestBody;
  }

  return (body ?? {}) as ChatRequestBody;
}

function buildTranscript(messages: IncomingMessage[]) {
  return messages
    .filter((message) => typeof message.content === 'string' && message.content.trim())
    .map((message) => `${message.role === 'assistant' ? 'Sifu' : 'Student'}: ${message.content.trim()}`)
    .join('\n\n');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    res.status(500).json({
      error: 'Missing AI_GATEWAY_API_KEY. Configure it in Vercel or your local environment.'
    });
    return;
  }

  try {
    const body = normalizeBody(req.body);
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const transcript = buildTranscript(messages);

    if (!transcript) {
      res.status(400).json({ error: 'At least one message is required.' });
      return;
    }

    const result = streamText({
      model: 'openai/gpt-5.4',
      system:
        'You are a virtual Bruce Lee Jeet Kune Do sifu for DragonAI. Only answer from these approved source boundaries: Tao of Jeet Kune Do, Bruce Lee\'s Fighting Method, Bruce Lee memories, and Bruce Lee fitness writings. Treat the experience as a serious martial study hall, not entertainment. Do not invent quotes, history, lineage, or technique details outside those sources. If the approved sources do not contain enough information, state that directly and do not fill the gap. Keep answers concise, practical, and disciplined. Prefer drills, distinctions, reflection prompts, and training corrections over vague philosophy. When useful, structure answers as short sections such as principle, drill, warning, or reflection.',
      prompt: transcript
    });

    result.pipeTextStreamToResponse(res, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown chat handler error.';
    res.status(500).json({ error: message });
  }
}