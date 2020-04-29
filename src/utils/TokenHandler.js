class TokenHandler {
    combine(tokenPrimary, tokenSignature) {
        return `${tokenPrimary}.${tokenSignature}`;
    }

    split(token) {
        const [
            header,
            payload,
            signature
        ] = token.split('.');

        const tokenPrimary = `${header}.${payload}`;

        return ({
            tokenPrimary,
            tokenSignature: signature
        });
    }
}

export default TokenHandler;
