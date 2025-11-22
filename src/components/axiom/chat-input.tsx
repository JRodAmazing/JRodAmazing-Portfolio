import { ChangeEvent, FormEvent } from 'react';

interface ChatInputProps {
  input: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, onChange, onSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-steel p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={onChange}
          placeholder="Ask about Justin..."
          disabled={isLoading}
          className="flex-1 rounded-xl border border-steel bg-void px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-plasma focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-plasma text-white transition-all hover:bg-plasma/80 disabled:opacity-50 disabled:hover:bg-plasma"
          aria-label="Send message"
        >
          {isLoading ? (
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
