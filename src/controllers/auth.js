const express = require('express')
const router = express.Router()
const request = require('request')
const axios = require('axios')
const queryString = require('querystring')
const { LoginToken } =require("../models/index");

const client_id = 'f2654a86ce4959d77cec';
const client_secret = '5d07bfc8e760737e2e02f317fb4826dee97a332b'

router.get('/login', (req,res) => {
	res.render('auth/login')
})

router.get('/callback', async (req, res) => {
  const { code } = req.query
  console.log(code)
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id,
    client_secret,
    code,
  })
  const { access_token } = queryString.parse(response.data)
  req.session.access_token = access_token
  const loginToken = await LoginToken.create({ token: access_token })
  res.redirect('http://localhost:4000?token=' + access_token)
})

router.get('/token', async (req, res) => {
  const token = await LoginToken.findOne({where: {
    token: req.headers.token
  }})
  if (token) {
    req.session.access_token = req.headers.token
    res.json(token)
  } else {
    res.json({ token: false })
  }
})


router.get("/logout", (req,res) => {
	req.session.access_token = "",
	res.redirect("auth/login");
})

module.exports = router