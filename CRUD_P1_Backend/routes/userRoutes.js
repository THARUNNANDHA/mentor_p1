const express = require('express');
const userControllers = require('../controllers/userControllers')
const router = express.Router();

router.get('/getallUser', userControllers.getallUser);
router.get('/getUser', userControllers.getUser)
router.get('/getTop10Student', userControllers.getTop10Student)
router.get('/getTop10StudentByName', userControllers.getTop10StudentByName)
router.post('/createUser', userControllers.createUser)
router.post('/bulkInsertUser', userControllers.bulkInsertUser)
router.delete('/deleteUser', userControllers.deletUser)
router.put('/updateUser', userControllers.updateUser)
router.put('/updateUserMeta', userControllers.updateUserMeta)
router.put('/bulkInsertUserMetadata', userControllers.bulkInsertUserMetadata)

module.exports = router;