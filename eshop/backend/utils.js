import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_PW, { expiresIn: '15d' });
};

export const isAuth = (req, res, next) => {
    
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_PW, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};

export const baseUrl = () =>
    process.env.BASE_URL
        ? process.env.BASE_URL
        : process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000'
            : 'https://yourdomain.com';