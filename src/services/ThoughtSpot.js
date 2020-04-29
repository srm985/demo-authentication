const MOCKED_USERS = [
    {
        created: 1585838126117,
        displayName: 'Rachit Pabreja',
        groupNames: [
            'All',
            'Mastercard Users - Testers'
        ],
        mail: 'patrick.harris@mastercard.com',
        modified: 1585838391275,
        name: 'rachit.pabreja',
        principalTypeEnum: 'LOCAL_USER',
        visibility: 'DEFAULT'
    }
];

class ThoughtSpot {
    async queryUsers() {
        return MOCKED_USERS;
    }

    async fetchUserDetails(thoughtSpotID) {
        return ({
            created: 1585838126117,
            displayName: 'Rachit Pabreja',
            groupNames: [
                'All',
                'Mastercard Users - Testers'
            ],
            mail: `${thoughtSpotID}@email.com`,
            modified: 1585838391275,
            name: 'rachit.pabreja',
            principalTypeEnum: 'LOCAL_USER',
            visibility: 'DEFAULT'
        });
    }

    async checkUserExists(thoughtSpotID) {
        try {
            const userList = await this.queryUsers();

            const doesUserExist = userList.find((userDetails) => {
                const {
                    name
                } = userDetails;

                return name === thoughtSpotID;
            });

            return !!doesUserExist;
        } catch (error) {
            return false;
        }
    }
}

export default ThoughtSpot;
