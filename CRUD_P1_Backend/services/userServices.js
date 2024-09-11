const { where } = require("sequelize");
const User = require('../model/userModel')
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

class UserService {

    validatePayload(data) {
        const namePatten = /^[a-zA-Z\s]{1,50}$/;
        const emailPatten = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const numberPatten = /^(\+91[\-\s]?)?[6-9]\d{9}$/
        const passwordPatten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/
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

    async bulkInsertUser(datas) {
        // console.log("data", datas)
        var alreadyExist = []
        var success = []
        for (const data of datas) {
            this.validatePayload(data)
            // console.log("email", data.email)
            const exist = await User.findOne({ where: { email: data.email } })
            if (exist) {
                alreadyExist.push(data.email)
                continue
            }
            await User.create(data)
            success.push(data.email)
        }
        return { alreadyExist, success }
    }

    async bulkInsertUserMetadata(datas) {
        var userNotFound = []
        var success = []
        for (const data of datas) {
            const exist = await User.findOne({ where: { id: data.id } })
            if (!exist) {
                // const temp = [data.id, data.email]
                userNotFound.push(data.id)
                continue
            }
            var currentMeta = exist.student_meta_data
            if (data.student_meta_data) {
                currentMeta = { ...currentMeta, ...data.student_meta_data }
                await exist.update({ student_meta_data: currentMeta })
                await exist.save()
                success.push(data.id)
            }

        }
        return { userNotFound, success }
    }
    async getTop10Student() {
        const topStudents = await User.findAll({
            order: [Sequelize.literal('student_meta_data->>\'marks\' DESC')],
            limit: 10
        })
        return (topStudents)
    }

    async getTop10StudentByName(nameStr) {
        const topStudents = await User.findAll({
            where: {
                userName: {
                    [Op.iLike]: `${nameStr}%`,
                }
            },
            order: [Sequelize.literal('student_meta_data->>\'marks\' DESC')],
            limit: 10
        })
        return (topStudents)
    }
}
module.exports = new UserService()