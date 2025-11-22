'use client';

import { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME_MESSAGE = "I'm AXIOM, Justin's AI representative. I can tell you about his background, skills, projects, and availability. What would you like to know?";

const SUGGESTED_QUESTIONS = [
  "What's Justin's tech stack?",
  "Tell me about his experience",
  "What projects has he built?",
  "Is he available for work?",
];

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_MESSAGE,
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/axiom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        // Non-streaming response (boundary, fallback, or rate limit)
        const data = await response.json();
        if (data.message) {
          setMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: data.message
            }
          ]);
        }
      } else {
        // Streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = '';

        const assistantId = (Date.now() + 1).toString();
        setMessages(prev => [
          ...prev,
          { id: assistantId, role: 'assistant', content: '' }
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            assistantContent += chunk;

            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Oops... not everything is perfect around here. I'm still working on it. Try again?"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-void/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-steel bg-tungsten sm:w-[420px]"
        style={{
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-steel p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-plasma/10">
              <span className="font-mono text-sm font-bold text-plasma">AX</span>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-text-primary">
                AXIOM
              </h2>
              <p className="text-xs text-text-tertiary">AI Representative</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-tertiary transition-colors hover:bg-steel hover:text-text-primary"
            aria-label="Close chat"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl bg-steel px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-plasma" style={{ animationDelay: '-0.3s' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-plasma" style={{ animationDelay: '-0.15s' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-plasma" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions (show only at start) */}
          {messages.length <= 1 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-text-tertiary">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestionClick(question)}
                    className="rounded-lg bg-steel px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-plasma/20 hover:text-text-primary"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput
          input={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
