import { FC } from 'react';

import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getActiveIngredientUrl } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(getActiveIngredientUrl);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
