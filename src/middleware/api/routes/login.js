import express from 'express';

import RateLimiter from '../../RateLimiter';

const rateLimiter = new RateLimiter();
const router = express.Router();

router.get('/login', rateLimiter.limited, (request, response) => {
    response.sendStatus(200);
});

export default router;
