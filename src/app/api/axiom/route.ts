import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { checkBoundaries, AXIOM_SYSTEM_PROMPT, getFallbackResponse, AXIOM_BOUNDARIES } from '@/lib/axiom/boundaries';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage?.content || '';

    // Check boundaries BEFORE calling AI
    const boundaryCheck = checkBoundaries(userQuery);
    if (!boundaryCheck.allowed) {
      return new Response(
        JSON.stringify({ message: boundaryCheck.redirect }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check message count (rate limiting)
    const userMessageCount = messages.filter((m: { role: string }) => m.role === 'user').length;
    if (userMessageCount >= AXIOM_BOUNDARIES.rateLimit.maxMessages) {
      return new Response(
        JSON.stringify({ message: AXIOM_BOUNDARIES.rateLimit.response }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      // Return a helpful fallback response without AI
      return new Response(
        JSON.stringify({ message: getFallbackResponse(userQuery) }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use Vercel AI SDK for streaming
    const result = streamText({
      model: openai('gpt-4-turbo'),
      system: AXIOM_SYSTEM_PROMPT,
      messages: messages.slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      })),
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error('AXIOM API Error:', error);
    return new Response(
      JSON.stringify({
        message: "Oops... not everything is perfect around here. I'm still working on it. Try again or reach out to Justin directly at jcroden25@gmail.com"
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
