import fireBaseAdmin from 'firebase-admin';

class Firebase {
    constructor() {
        this.initialize();
    }

    initialize() {
        const {
            env: {
                FIREBASE_CLIENT_EMAIL,
                FIREBASE_PRIVATE_KEY,
                FIREBASE_PROJECT_ID
            }
        } = process;

        this.firebase = fireBaseAdmin.initializeApp({
            credential: fireBaseAdmin.credential.cert({
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY,
                projectId: FIREBASE_PROJECT_ID
            })
        });
    }

    async createUser(userDetails) {
        const {
            clientName,
            displayName,
            mail,
            password,
            thoughtSpotID
        } = userDetails;

        await this.firebase.auth().createUser({
            displayName,
            email: mail,
            password,
            uid: `${clientName}_${thoughtSpotID}`
        });
    }
}

export default Firebase;
