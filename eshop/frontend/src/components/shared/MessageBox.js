import { Alert } from '../../Imports';

function MessageBox({ children, variant }) {
    return <Alert variant={variant || 'info'}>{children}</Alert>
}

export default MessageBox;