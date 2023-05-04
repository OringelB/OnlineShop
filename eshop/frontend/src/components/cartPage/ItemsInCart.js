import { Row, Col, Link, MessageBox, Button, ListGroup } from '../../Imports';

//Handles Items visibility and funcionality with regards to the cart in the center-left side of the cart-page.
//Main functionality: Receives and displays cart-Items. User has the ability to remove (entirely as well)/add existing items from the cart.

function ItemsInCart({ cartItems, updateCartHandler, removeItemHandler }) {
    return (
        <div>
            {cartItems.length === 0 ? (
                <MessageBox>
                    Your cart is empty. {' '}
                    <Link to='/'>Go back to Home Page</Link>
                </MessageBox>
            ) : (
                <ListGroup>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <img className="img-fluid rounded img-thumbnail" src={item.image} alt={item.name} />
                                    {' '}
                                    <Link to={`/product/${item.token}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={3}>
                                    <Button onClick={() => updateCartHandler(item, item.quantity - 1)} variant="light" disabled={item.quantity === 1} >
                                        <i className="fas fa-minus-circle"></i>
                                    </Button>
                                    {' '}
                                    <span>{item.quantity}</span>
                                    {' '}
                                    <Button variant="light" disabled={item.quantity === item.countInStock} onClick={() => updateCartHandler(item, item.quantity + 1)}>
                                        <i className="fas fa-plus-circle"></i>
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    {item.price}$
                                </Col>
                                <Col md={2}>
                                    <Button variant="light" onClick={() => removeItemHandler(item)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                    }
                </ListGroup>
            )}
        </div>
    )
}
export default ItemsInCart;