import { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ptBR from 'date-fns/locale/pt-BR';
import { formatDistanceToNow } from 'date-fns';
import { HeartStraight, ShareNetwork } from 'phosphor-react';

import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

import * as C from './styles';

interface ICardProps {
  recipe: IRecipe
  removeFavorite?: (recipe: any) => void
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
    <C.Container>
      <Link to={redirectUrl}>
        <img src={recipe.image} alt="" />
      </Link>

      <C.RecipeInfo>
        <div className="recipe-info">
          <h2>{recipe.name}</h2>

          <div>
            {recipe.alcoholicOrNot && (
            <p>{recipe.alcoholicOrNot}</p>
            )}

            {recipe.nationality && (
            <p>{`${recipe.nationality}-${recipe.category}`}</p>
            )}

            <p>
              {recipe.doneDate
              && formatDistanceToNow(new Date(recipe.doneDate), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <div className="options-menu">
          {removeFavorite && (
          <button type="button" onClick={() => removeFavorite(recipe)}>
            <HeartStraight
              size={25}
              color="#fff"
              weight="fill"
            />
          </button>
          )}

          <button type="button" onClick={handleClickShare}>
            <ShareNetwork
              size={25}
              color="#fff"
              weight="bold"
            />
          </button>
          {linkCopied && (<p>Link copied!</p>)}
        </div>

      </C.RecipeInfo>
    </C.Container>
  );
}
