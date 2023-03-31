import {uiActions} from "../ui/ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Fetching...',
                message: 'Fetching cart data!',
            })
        );
        const fetchCart = async () => {
            const response = await fetch('https://react-tests-fea74-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json');
            if (!response.ok) {
                throw new Error('Fetching cart data failed.');
            }
            const cart = await response.json();
            return cart
        }

        try {
            const cartData = await fetchCart();
            dispatch(cartActions.replaceCart(cartData));
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Fetched cart data successfully!',
                })
            );
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    }
}
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );
        const sendCart = async () => {
            const response = await fetch(
                'https://react-tests-fea74-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
                }
            );
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        }

        try {
            await sendCart();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    }
}