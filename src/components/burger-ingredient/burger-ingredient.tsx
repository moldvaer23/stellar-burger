import { FC, memo } from 'react';

import { BurgerIngredientUI } from '@ui';
import { useLocation } from 'react-router-dom';

import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => dispatch(addIngredient(ingredient));

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
