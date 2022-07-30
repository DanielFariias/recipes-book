import { MagnifyingGlass, User } from 'phosphor-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { SearchInput } from './SearchInput';
import * as C from './styles';

interface HeaderProps {
  title: string
  hasSearchInput?: boolean
}

export default function Header({ title, hasSearchInput }: HeaderProps) {
  const [ToggleSearch, setToggleSearch] = useState(false);

  function handleToggleSearch() {
    setToggleSearch((state) => !state);
  }

  return (
    <C.Container>
      <C.HeaderMenu>
        <Link to="/profile">
          <User size={32} color="#FB9400" weight="bold" />
        </Link>

        <h1>{title}</h1>

        <button
          type="button"
          onClick={handleToggleSearch}
        >
          <MagnifyingGlass size={32} color="#FB9400" weight="bold" />
        </button>
      </C.HeaderMenu>

      {(hasSearchInput && ToggleSearch) && (
        <SearchInput />
      )}

    </C.Container>
  );
}
