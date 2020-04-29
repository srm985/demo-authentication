import express from 'express';

import Firebase from '../../../services/Firebase';

const router = express.Router();

router.get('/alive', (request, response) => {
    const firebase = new Firebase();

    firebase.retrieveUser(1);
    response.send('Alive!!');
});

export default router;
