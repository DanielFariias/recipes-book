import { useState } from 'react';
import { Link } from 'react-router-dom';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { SearchInput } from './SearchInput';

interface HeaderProps {
  title: string
  hasSearchInput: boolean
}

export default function Header({ title, hasSearchInput }: HeaderProps) {
  const [ToggleSearch, setToggleSearch] = useState(false);

  function handleToggleSearch() {
    setToggleSearch((state) => !state);
  }

  return (
    <header>
      <Link to="/profile">
        <img src={profileIcon} alt="Person Icon minimalist" />
      </Link>

      <h1>{title}</h1>

      <button
        type="button"
        onClick={handleToggleSearch}
      >
        <img
          src={searchIcon}
          alt="Magnifying glass Icon blacn and withe minimalist"
        />
      </button>

      {(hasSearchInput && ToggleSearch) && (
        <SearchInput />
      )}

    </header>
  );
}
