const express = require('express')
const router = new express.Router()
const passport = require('passport')
const DashboardController = require('../controllers/dashboard')


router.get('/dashboard',passport.checkAuthentication,DashboardController.getdashboard)

router.post('/uploadeventdata',passport.checkAuthentication,DashboardController.uploadevent)

router.get('/addevent',passport.checkAuthentication,DashboardController.geteventform)

router.get('/eventdata/:eventname',passport.checkAuthentication,DashboardController.geteventdata)

router.get('/castdata/:eventname',passport.checkAuthentication,DashboardController.castdata)

router.post('/deleteevent/:eventname',passport.checkAuthentication,DashboardController.deleteevent)

router.get('/accesspage',passport.checkAuthentication,DashboardController.getaccesspage)

router.post('/inviteaccess',passport.checkAuthentication,DashboardController.inviteaccess)

module.exports = router;