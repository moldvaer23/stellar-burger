import { FC, memo } from 'react';

import { BurgerConstructorElementUI } from '@ui';

import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';
import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleClose = () => dispatch(removeIngredient(ingredient.id));
    const handleMoveDown = () => dispatch(moveIngredientDown(ingredient.id));
    const handleMoveUp = () => dispatch(moveIngredientUp(ingredient.id));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
