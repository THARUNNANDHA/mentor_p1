const express = require('express');
const userControllers = require('../controllers/userControllers')
const router = express.Router();

router.get('/getallUser', userControllers.getallUser);
router.get('/getUser', userControllers.getUser)
router.post('/createUser', userControllers.createUser)
router.delete('/deleteUser', userControllers.deletUser)
router.put('/updateUser', userControllers.updateUser)
router.put('/updateUserMeta', userControllers.updateUserMeta)

module.exports = router;