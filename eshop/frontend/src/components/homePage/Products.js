import { Row, Col, Product } from '../../Imports';

//This component iterates over the products and returns the product Component with varying display properties depending on the screen size.

function Products({ products }) {
    return (
        <Row>
            {products.map((product) => (
                <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">
                    <Product product={product}></Product>
                </Col>
            ))}
        </Row>
    )
}
export default Products;