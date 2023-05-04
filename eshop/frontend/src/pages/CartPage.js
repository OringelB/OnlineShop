import {
    useContext, Store, Col, Row, Title, Checkout, ItemsInCart, axios, ADD_TO_CART, GET_FAIL,
    REMOVE_FROM_CART, useNavigate
} from '../Imports'

function CartPage() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    }

    const updateCartHandler = async (item, quantity) => {
        try {
            const { data } = await axios.get(`/api/v1/products/${item._id}`);
    
            if (data.countInStock < quantity) {
                window.alert('Sorry. Product is out of stock');
                return;
            }
            ctxDispatch({
                type: ADD_TO_CART,
                payload: { ...item, quantity },
            });
            
        } catch (err) {
            ctxDispatch({ type: GET_FAIL, payload: err.message });
        }
    }

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: REMOVE_FROM_CART,
            payload: item,
        })
    }

    return (
        <div>
            <Title title='Shopping Cart' />
            <Row>
                <Col md={8}>
                    <ItemsInCart removeItemHandler={removeItemHandler} updateCartHandler={updateCartHandler} cartItems={cartItems} />
                </Col>
                <Col md={4}>
                    <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler} />
                </Col>
            </Row>
        </div>
    )
}
export default CartPage; 