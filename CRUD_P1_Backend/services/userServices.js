const { where } = require("sequelize");
const User = require('../model/userModel')

class UserService {

    validatePayload(data) {
        const namePatten = /^[a-zA-Z\s]{1,50}$/;
        const emailPatten = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const numberPatten = /^(\+91[\-\s]?)?[6-9]\d{9}$/
        const passwordPatten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[a-zA-Z\d!@#$%^&*]{8,}$/
        if (!namePatten.test(data.userName)) { throw new Error("invalid Name") }
        if (!numberPatten.test(data.phNumber)) { throw new Error("invalid phone") }
        if (!emailPatten.test(data.email)) { throw new Error("invalid email") }
        if (!passwordPatten.test(data.password)) { throw new Error("invalid password") }

    }
    async createUser(data) {
        this.validatePayload(data)
        const user = await User.findOne({ where: { email: data.email } })
        if (user) {
            throw new Error("User already exist")
        }
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
        this.validatePayload(data)
        const exist = await User.findOne({ where: { email: data.email } });
        if (!exist) {
            throw new Error('User not found')
        }

        var currMetadata = exist.student_meta_data || {}
        if (data.student_meta_data) {
            currMetadata = { ...currMetadata, ...data.student_meta_data }
        }

        if (exist) {
            // await exist.update({ userName: data.userName, password: data.password, phNumber: data.phNumber, student_meta_data: currMetadata });
            await exist.update({ userName: data.userName, password: data.password, phNumber: data.phNumber, student_meta_data: data.student_meta_data });
            await exist.save();
            return exist;
        }

    }

    async updateUserMeta(id, data) {
        const exist = await User.findOne({ where: { id: id } });
        if (!exist) {
            throw new Error("User not found")
        }
        var currMetadata = exist.student_meta_data || {}
        if (data) {
            currMetadata = { ...currMetadata, ...data }
        }
        await exist.update({ student_meta_data: currMetadata });
        await exist.save();
        return exist;
    }
}
module.exports = new UserService()