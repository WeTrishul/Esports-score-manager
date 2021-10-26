const express = require('express')
const router = new express.Router()
const DashboardController = require('../controllers/dashboard')


router.get('/dashboard',DashboardController.getdashboard)

router.post('/uploadeventdata',DashboardController.uploadevent)

router.get('/addevent',DashboardController.geteventform)

router.get('/eventdata/:eventname',DashboardController.geteventdata)

router.get('/castdata/:eventname',DashboardController.castdata)


// router.post('/increment',DashboardController.incrementval)


module.exports = router;