import { addProduct, removeProduct } from '../reducers/productReducer';
import { AppDispatch } from '../store';

export const addNewProduct = (product: any) => (dispatch: AppDispatch) => {
  dispatch(addProduct(product));
};

export const deleteProduct = (id: string) => (dispatch: AppDispatch) => {
  dispatch(removeProduct({ id }));
};
