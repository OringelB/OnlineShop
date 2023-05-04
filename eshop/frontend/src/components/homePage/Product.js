import { Link, Card, Button, Rating, useContext, Store, addToCartHandler } from '../../Imports';

//Represents a single item in the home-page.
//Main functionality: Displays item in the form of a card, with the relevent information: Image, Title, Rating, Price.

function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', product._id);
  };

  return (
    <Card draggable="true" onDragStart={handleDragStart} className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img variant='top' src={product.image} alt={product.title} />
      </Link>
      <Card.Body className='card-body'>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Rating
          rating={product.rating.rate}
          numReviews={product.rating.count}
        ></Rating>
        <Card.Text>{product.price}$</Card.Text>

        {/* if the product is NOT in stock, a 'Out of Stock' button will appear instead of the usual 'Add to Cart' button*/}
        {product.countInStock === 0 ?
          <Button variant='light' disabled>Out of Stock</Button>
          :
          <Button onClick={() => addToCartHandler(product, cartItems, ctxDispatch)} className="btn-primary">Add to Cart</Button>
        }
      </Card.Body>
    </Card>
  );
}

export default Product;
