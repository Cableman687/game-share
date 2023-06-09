const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.REACT_APP_JWT_SECRET
const expiration = '2h';



module.exports = {
    // Authorisation middleware to deal with client requests to the server.
    // Request explanation of 'secret' argument at line #23. and concept of 'headers'
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if(req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if(!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
        } catch {
            console.log('invalid token');
        }
        
        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};