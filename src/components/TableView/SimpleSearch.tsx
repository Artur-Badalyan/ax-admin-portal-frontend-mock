import React from 'react';
import { Input } from 'antd';
import { SearchIcon } from 'lucide-react';

interface SimpleSearchProps {
  searchValue: string;
  onSearchCallback?: (value: string) => void;
  placeholder?: string;
}

const SimpleSearch: React.FC<SimpleSearchProps> = ({
  searchValue,
  onSearchCallback,
  placeholder = 'Search...',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchCallback) {
      onSearchCallback(e.target.value);
    }
  };

  return (
    <Input
      value={searchValue}
      onChange={handleChange}
      placeholder={placeholder}
      allowClear
      prefix={<SearchIcon size={16} />}
    />
  );
};

export default SimpleSearch;
