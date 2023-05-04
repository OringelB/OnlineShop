import { useReducer, createContext, storeReducer} from './Imports';

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            :
            [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) 
        : 
        {},
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod')
        :
        ''      
    },
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    const body = { state, dispatch };

    return <Store.Provider value={body}>
        {props.children}
    </Store.Provider>
}