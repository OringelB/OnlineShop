import { Button, Form, useNavigate, useState } from "../../Imports";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchBox = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    };

    return (
        <Form onSubmit={(e) => submitHandler(e)} className="d-flex me-auto w-50">
            <InputGroup>
                <FormControl aria-describedby='button-search' placeholder='Search for products' type='text' name='q' id='q' onChange={(e) => setQuery(e.target.value)}>

                </FormControl>
                <Button variant="outline-primary" type='submit' id="button-search"><i className="fas fa-search"></i></Button>
            </InputGroup>
        </Form>
    )
}
export default SearchBox;