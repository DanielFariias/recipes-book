import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import { useState } from 'react';
import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

interface ICardProps {
  recipe: IRecipe
  removeFavorite?: (recipe:any) => void
}

export default function Card({ recipe, removeFavorite }: ICardProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const redirectUrl = recipe.type === 'food'
    ? `/foods/${recipe.id}`
    : `/drinks/${recipe.id}`;

  const copyUrl = recipe.type === 'food'
    ? `http://localhost:3000/foods/${recipe.id}`
    : `http://localhost:3000/drinks/${recipe.id}`;

  function handleClickShare() {
    copy(copyUrl);
    setLinkCopied(true);
  }

  return (
    <div>

      <Link to={redirectUrl}>
        <img src={recipe.image} alt="" />
        <p>
          {recipe.name}
        </p>
      </Link>

      {recipe.alcoholicOrNot && (
        <p>{recipe.alcoholicOrNot}</p>
      )}

      {recipe.nationality && (
        <p>{`${recipe.nationality}-${recipe.category}`}</p>
      )}

      <p>
        {recipe.doneDate}
      </p>
      {removeFavorite && (
      <button type="button" onClick={() => removeFavorite(recipe)}>
        <img src={blackHeartIcon} alt="" />
      </button>
      )}
      <button type="button" onClick={handleClickShare}>
        <img src={shareIcon} alt="" />
      </button>
      {linkCopied && (<p>Link copied!</p>)}

      {!!recipe?.tags?.length
        && recipe.tags.map((tag: string) => (
          <p key={tag}>{tag}</p>
        ))}
    </div>
  );
}
