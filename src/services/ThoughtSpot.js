const MOCKED_USERS = [
    {
        created: 1585838126117,
        displayName: 'Emelie Doyle',
        groupNames: [
            'All',
            'Demo Users - Testers'
        ],
        mail: 'emelie.doyle@email.com',
        modified: 1585838391275,
        name: 'emelie.doyle',
        principalTypeEnum: 'LOCAL_USER',
        visibility: 'DEFAULT'
    }
];

class ThoughtSpot {
    async queryUsers() {
        return MOCKED_USERS;
    }

    async fetchUserDetails(thoughtSpotID) {
        const [
            sampleUser
        ] = MOCKED_USERS;

        return ({
            ...sampleUser,
            mail: `${thoughtSpotID}@email.com`
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
