export default class UserInfo {
    constructor({name, profession}) {
        this._name = name;
        this._profession = profession;
    }

    getUserInfo() {
        const userInformation = {
            name: this._name.textContent,
            profession: this._profession.textContent
        };
        return userInformation;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._profession.textContent = data.profession;
    }
}