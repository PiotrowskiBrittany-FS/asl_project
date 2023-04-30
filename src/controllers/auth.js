const express = require('express')
const router = express.Router()
const request = require('request')
const axios = require('axios')
const querystring = require('querystring')
const { LoginToken } =require("../models/index");

const client_id = 'f2654a86ce4959d77cec';
const client_secret = '5d07bfc8e760737e2e02f317fb4826dee97a332b'

router.get('/login', (req,res) => {
	res.render('auth/login')
})

//When the user clicks login the system will lead them to the github login with this client ID
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  await request(
    {
      uri: "https://github.com/login/oauth/access_token",
      qs: {
        client_id: 'f2654a86ce4959d77cec',
        client_secret: '5d07bfc8e760737e2e02f317fb4826dee97a332b',
        code,
      },
    },
    //if there is an error the user will be redirected
    async (error, response, body) => {
      const { access_token } = querystring.parse(body);
      req.session.access_token = access_token;
      const loginToken = await LoginToken.create({ token: access_token });
      res.redirect("http://localhost:4000?token=" + access_token);
    }
  );
});

//The token is found from the github login
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

//route for logging out
router.get("/logout", (req,res) => {
	req.session.access_token = "",
	res.redirect("auth/login");
})

module.exports = router