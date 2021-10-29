const { response } = require('express')
const mongoose = require('mongoose')
const Event = require('../model/eventdata')
const User = require('../model/user')

module.exports.getLogin = (req,res)=>{

        if(!req.isAuthenticated())
    {
        res.render('login')
    }
    else
    {
        res.redirect('/dashboard') 
    }
}

module.exports.postLogin = async (req,res)=>{
    console.log('aja bhai postLogin')
    res.redirect('/dashboard')
}

module.exports.getsignup = (req,res)=>{

    if(!req.isAuthenticated())
    {
        res.render('signup')
    }
    else
    {
        res.redirect('/dashboard')
    }
   
}

module.exports.postSignup = async(req,res)=>{
    
    console.log('hii')
    console.log(req.body)
    try {
        const user = await new User(req.body)
        await user.save()

        res.redirect('/login')
    } catch (error) {
        console.log('Error in signup')
    }  
}


module.exports.logout =(req,res)=>{
    console.log('logout')
    req.logout();
    res.redirect('/login');
}

