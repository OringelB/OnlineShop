import { Card, ListGroup, Button } from '../../Imports';

//Handles Checkout Box in the top-right side of the cart-page.
//Main functionality: Counts of the items in the cart, displays the overall price and the ability to navigate to checkout.

function Checkout({ cartItems, checkoutHandler }) {
    return (
        <Card>
            <Card.Body>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>
                            {/* Counts the items the cart */}
                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                            {' '}
                            {/* Calculates the overall price */}
                            Items) : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid">
                            <Button type="button" variant="primary" disabled={cartItems.length === 0} onClick={() => checkoutHandler()}>
                                Checkout
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
export default Checkout;