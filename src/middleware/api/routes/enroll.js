import express from 'express';

import Firebase from '../../../services/Firebase';
import ThoughtSpot from '../../../services/ThoughtSpot';

import RateLimiter from '../../RateLimiter';

const router = express.Router();

const firebase = new Firebase();
const rateLimiter = new RateLimiter();
const thoughtSpot = new ThoughtSpot();

router.post('/enroll', rateLimiter.limited, async (request, response) => {
    try {
        const {
            body: {
                clientName = 'demo',
                thoughtSpotID,
                password
            } = {}
        } = request || {};

        if (!thoughtSpotID || !password) {
            return response.status(422).send({
                errorCode: 1,
                errorMessage: 'Please enter a valid ThoughtSpot ID and password.'
            });
        }

        const thoughtSpotUserDetails = await thoughtSpot.fetchUserDetails(thoughtSpotID);

        const doesUserExist = Object.keys(thoughtSpotUserDetails).length;

        if (!doesUserExist) {
            // TODO: Send an email notification.

            return response.status(422).send({
                errorCode: 1,
                errorMessage: 'Please enter a valid ThoughtSpot ID and password.'
            });
        }

        await firebase.createUser({
            ...thoughtSpotUserDetails,
            clientName,
            password,
            thoughtSpotID
        });

        return response.status(200).send({
            successCode: 1,
            successMessage: 'Successfully created new user.'
        });
    } catch (error) {
        return response.status(500).send({
            errorCode: 2,
            errorMessage: 'Unable to create user.'
        });
    }
});

export default router;
