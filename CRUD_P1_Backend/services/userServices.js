const { where } = require("sequelize");
const User = require('../model/userModel')

class UserService {
    async createUser(data) {
        return await User.create(data);
    }
    async getallUser() {
        return await User.findAll();
    }
    async getUser(id) {
        const exist = await User.findOne({ where: { id: id } });
        if (exist) {
            return exist;
        }
        throw new Error('User not found')
    }

    async deleteUser(id) {
        const exist = await User.findOne({ where: { id: id } });
        if (exist) {
            await exist.destroy()
            return "success"
        }
        throw new Error('User not found')
    }
    async updateUser(id, data) {
        const exist = await User.findOne({ where: { id: id } });
        if (exist) {
            await exist.update(data);
            return exist;
        }
        throw new Error('User not found')
    }
}
module.exports = new UserService()