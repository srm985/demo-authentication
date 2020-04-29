import TokenHandler from '../utils/TokenHandler';

import {
    COOKIE_NAME_ACCESS
} from '../constants';

class Auth {
    constructor() {
        this.tokenHandler = new TokenHandler();
    }

    constructToken(request) {
        const {
            headers: {
                authorization = ''
            } = {}
        } = request || {};

        const TOKEN_REGEX = /^(Bearer\s)|(Token:\s)/;

        const tokenSignature = authorization.replace(TOKEN_REGEX, '');

        const {
            cookies: {
                [COOKIE_NAME_ACCESS]: tokenPrimary
            } = {}
        } = request;

        if (tokenPrimary && tokenSignature) {
            return this.tokenHandler.combine(tokenPrimary, tokenSignature);
        }

        return null;
    }

    required(request, response, next) {
        const token = this.constructToken(request);

        if (!token) {
            response.sendStatus(401);
        }

        next();
    }
}

export default Auth;
