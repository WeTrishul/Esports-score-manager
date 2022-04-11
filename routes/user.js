const express = require('express')
const passport = require('passport')
const router = new express.Router()
const userController = require('../controllers/user')


router.get('/login',userController.getLogin)
router.get('/admin/:email',userController.changeAdmin)

router.post('/login/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/login'}
    ),userController.postLogin)

router.get('/signup',userController.getsignup)
router.post('/signupUser',userController.postSignup)

router.get('/logout',userController.logout)

module.exports  = router