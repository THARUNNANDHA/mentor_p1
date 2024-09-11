const userService = require('../services/userServices')

class UserController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body)
            res.status(200).json(user)
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.body.id, req.body.data)
            res.status(200).json(user)
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async deletUser(req, res) {
        try {
            await userService.deleteUser(req.body.id)
            res.status(200).json({ 'error': 'Deleted Success' })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async getallUser(req, res) {
        try {
            const user = await userService.getallUser()
            res.status(200).json({ 'user': user })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async getUser(req, res) {
        try {
            const user = await userService.getUser(req.body.id)
            res.status(200).json({ "user": user })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async updateUserMeta(req, res) {
        try {
            const user = await userService.updateUserMeta(req.body.id, req.body.student_meta_data)
            res.status(200).json({ "user": user })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async bulkInsertUser(req, res) {
        try {
            const result = await userService.bulkInsertUser(req.body.data)
            // console.log(result)
            res.status(200).json({ "SuccessInserted": result.success, "AlreadyExist": result.alreadyExist })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async bulkInsertUserMetadata(req, res) {
        try {
            const result = await userService.bulkInsertUserMetadata(req.body.data)
            // console.log(result)
            res.status(200).json({ "SuccessInserted": result.success, "AlreadyExist": result.alreadyExist })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async getTop10Student(req, res) {
        try {
            const user = await userService.getTop10Student()
            res.status(200).json({ 'getTop10Student': user })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }
    async getTop10StudentByName(req, res) {
        try {
            const name = req.body.name
            const user = await userService.getTop10StudentByName(name)
            res.status(200).json({ 'getTop10StudentByName': user })
        }
        catch (err) {
            res.status(400).json({ 'error': err.message })
        }
    }

}

module.exports = new UserController();