import {
    axios, useLocation, useNavigate, Container, useContext, useEffect, useState, Store,
    getError, Title, USER_SIGNIN, Form, Link, Button, toast
} from '../Imports'

function SignupPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords must match!');
            return;
        }

        try {
            const { data } = await axios.post('/api/v1/users/signup', {
                name,
                email,
                password,
            });

            ctxDispatch({ type: USER_SIGNIN, payload: data });

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (err) {
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


    return (
        <Container className="small-container">
            <Title title='Sign-up' />
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>    
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    required
                    onChange={(e) => SetConfirmPassword(e.target.value)}
                />
            </Form.Group> 
            <div className="mb-3">
                <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
                Already have an account?
                {' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
            </div>
        </Form>
        </Container>
    )
}
export default SignupPage;