import { createGateway, streamText } from 'ai';

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

function getGatewayApiKey() {
  return (
    process.env.AI_GATEWAY_API_KEY ||
    process.env.DRAGON_AI ||
    process.env.dragon_ai ||
    process.env.DRAGON_KEY ||
    process.env.dragon_key ||
    ''
  );
}

export default async function handler(req: any, res: any) {
  const gatewayApiKey = getGatewayApiKey();

  if (req.method === 'GET') {
    res.status(200).json({
      ok: true,
      hasGatewayKey: Boolean(gatewayApiKey),
      model: 'openai/gpt-5.4'
    });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!gatewayApiKey) {
    res.status(500).json({
      error: 'Missing AI gateway key. Configure AI_GATEWAY_API_KEY, DRAGON_AI, dragon_ai, DRAGON_KEY, or dragon_key in Vercel.'
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

    const aiGateway = createGateway({
      apiKey: gatewayApiKey
    });

    const result = streamText({
      model: aiGateway('openai/gpt-5.4'),
      system:
        'You are the virtual sifu for dragon_ai. You must answer ONLY from these approved sources: Tao of Jeet Kune Do, Bruce Lee\'s Fighting Method (all volumes), The Art of Expressing the Human Body, and Living the Martial Way. If a question cannot be answered directly from these sources, say: "The approved sources do not contain enough information to answer that." Do NOT invent, speculate, or use any other material. Do not create new quotes, history, or technique details. Treat the experience as a disciplined martial study hall. Prefer practical drills, distinctions, and training corrections over vague philosophy. When useful, structure answers as short sections: principle, drill, warning, or reflection. Always cite the source and page/volume when possible.',
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