import {
  useParams, useEffect, useReducer, axios, Row, Col, Loading, MessageBox, getError, ProductDescription, CartDescription,
  Store, useContext, useNavigate, GET_REQUEST, GET_FAIL, GET_SUCCESS, addToCartHandler, productPageReducer
} from '../Imports'

function ProductPage() {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const initialState = {
    loading: true,
    error: '',
    products: [],
  };

  const [{ loading, error, product }, dispatch] = useReducer(productPageReducer, initialState);

  const addToCart = async () => {
    await addToCartHandler(product, cartItems, ctxDispatch);
    navigate('/cart');
  }

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };

    getProduct();
  }, [token]);

  return (
    <div>
      {loading ? <Loading />
        :
        error ?
          (
            <MessageBox variant='danger'>
              {error}
            </MessageBox>
          )
          :
          (
            <div>
              <Row>
                <Col md={6}>
                  <img height={400} width={400} src={`${product.image}`} alt={product.title} />
                </Col>

                <Col md={3}>
                  <ProductDescription {...product} />
                </Col>

                <Col md={3}>
                  <CartDescription product={product} addToCart={addToCart} />
                </Col>
              </Row>
            </div>
          )}
    </div>
  );
}
export default ProductPage;