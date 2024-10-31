import { useState } from 'react';

export const useHook = () => {
  const usePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return {
      searchTerm,
      setSearchTerm
    };
  };

  return { usePage };
};
