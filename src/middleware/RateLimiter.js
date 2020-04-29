import rateLimit from 'express-rate-limit';

class RateLimiter {
    constructor() {
        const PERMITTED_TRIES = 10;
        const TIMEOUT_MS = 60000;

        this.apiLimiter = rateLimit({
            max: PERMITTED_TRIES,
            windowMs: TIMEOUT_MS
        });
    }

    limited = (request, response, next) => {
        this.apiLimiter(request, response, next);
    }
}

export default RateLimiter;
