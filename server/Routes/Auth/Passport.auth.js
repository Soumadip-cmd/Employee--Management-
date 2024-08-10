const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route for login failure
router.get('/login/failed', (req, res) => {
  res.status(401).json({ 
    success: false, 
    msg: 'You are not authenticated' 
  });
});


router.get('/login/success', (req, res) => {
  if (req.user) { 
    res.status(200).json({
      success: true, 
      msg: 'Successfully logged in',
      token: req.user.token
    });
  } else {
    res.status(401).json({
      success: false,
      msg: 'You are not authenticated'
    });
  }
});



//google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/login/failed' }),
  function (req, res) {
       
    if (req.user && req.user.token) {
      // res.redirect(`http://localhost:3000/applyLeave`);
      res.redirect(`https://employee-management-sb5z.vercel.app/applyLeave`);
    } else {
      res.redirect('/auth/login/failed'); 
    }
  }
);


//facebook
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);


router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/auth/login/failed' }),
  function (req, res) {
       
    if (req.user && req.user.token) {
      // res.redirect(`http://localhost:3000/applyLeave?token=${req.user.token}`);
      res.redirect(`https://employee-management-sb5z.vercel.app/applyLeave`);

    } else {
      res.redirect('/auth/login/failed'); 
    }
  }
);



module.exports = router;
