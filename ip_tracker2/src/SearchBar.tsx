import { useState } from 'react';

interface SearchBarProps {
  onSearch: (ipAddress: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl mx-auto mt-5">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for any IP address or domain"
        className="flex-1 px-4 py-3 text-base border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <button 
        type="submit" 
        className="px-6 py-3 bg-black text-white text-xl border-none rounded-r-lg cursor-pointer hover:bg-gray-800 transition-colors"
      >
        →
      </button>
    </form>
  );
}

export default SearchBar;