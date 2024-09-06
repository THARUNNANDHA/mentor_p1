const userService = require('../services/userServices')

class UserController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body)
            res.status(200).json(user)
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
    }
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.body.id, req.body.data)
            res.status(200).json(user)
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
    }
    async deletUser(req, res) {
        try {
            await userService.deleteUser(req.body.id)
            res.status(200).json({ 'message': 'Deleted Success' })
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
    }
    async getallUser(req, res) {
        try {
            const user = await userService.getallUser()
            res.status(200).json({ 'user': user })
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
    }
    async getUser(req, res) {
        try {
            const user = await userService.getUser(req.body.id)
            res.status(200).json({ "user": user })
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
    }

}

module.exports = new UserController();