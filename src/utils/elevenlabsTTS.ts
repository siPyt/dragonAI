// ElevenLabs TTS utility
// Usage: await elevenlabsTTS(text)

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || import.meta.env.VITE_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'Lci8YeL6PAFHJjNKvwXq';

export async function elevenlabsTTS(text: string): Promise<Blob | null> {
  if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) return null;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.7 }
    })
  });
  if (!response.ok) return null;
  return await response.blob();
}

// Example usage (in a React component):
// import { elevenlabsTTS } from '../utils/elevenlabsTTS';
// const audioBlob = await elevenlabsTTS('Hello world');
// if (audioBlob) {
//   const url = URL.createObjectURL(audioBlob);
//   const audio = new Audio(url);
//   audio.play();
// }
