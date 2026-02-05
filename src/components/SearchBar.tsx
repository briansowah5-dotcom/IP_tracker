import { useState } from 'react';

interface SearchBarProps {
  onSearch: (ipAddress: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for any IP address or domain"
        className="flex-1 px-6 py-4 text-lg bg-white text-gray-800 focus:outline-none placeholder:text-gray-400"
      />
      <button 
        type="submit" 
        className="px-8 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
