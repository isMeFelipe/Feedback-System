const express = require('express')
const router  = express.Router() // For export routes
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;


require("../models/User")
const User = mongoose.model("users")

require("../models/Feedback")
const Feedback = mongoose.model("feedbacks")




// Routes


router.get('/login', (req, res) => {
    res.render('admin/loginform')
});

router.post('/login/auth', (req,res) => {
    User.findOne({email: req.body.email}).lean().then((user) => {
        if(!user){
            req.flash("error_msg", "Unregistered admin")
            res.redirect("/admin/login")
        }else{
        bcrypt.compare((req.body.email + req.body.password), user.hashcode).then((result) => {
            if(result && user.isadmin == 1){
                req.flash("successful login")
                const encodedHashcode = encodeURIComponent(user.hashcode);
                res.redirect("/admin/initialpage/"+encodedHashcode)
            }else{
                req.flash("error_msg", "Invalid password or e-mail")
                res.redirect("/user/login")
            }
        });
        }   
    }).catch((err) => {
        req.flash("error_msg", "Internal error in admin authentication")
        res.redirect("/")
    })
    // res.redirect('/admin/page/' + hascode)
})

router.get('/initialpage/:hashcode', (req,res) => {
    Feedback.find().then((feedbacks) => {
        res.render('admin/initialpage', {hashcode: req.params.hashcode, feedbacks: feedbacks})
    }).catch((err) => {
        req.flash("error_msg", "Internal error in feedbacks rescue")
        res.render('admin/initialpage', {hashcode: req.params.hashcode, feedbacks: {}})
    })
    
})

router.get('/analysis/', (req, res) => {
    Feedback.aggregate([
      { $group: { _id: '$avaliation', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    .then(results => {
      const counts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };
  
      results.forEach(result => {
        counts[result._id] = result.count;
      });
  
      const total_number = counts[1] + counts[2] + counts[3] + counts[4] + counts[5];

      const percentage5     = total_number !== 0 ? ((counts[5] / total_number) * 100).toFixed(2) : 0;
      const percentage4     = total_number !== 0 ? ((counts[4] / total_number) * 100).toFixed(2) : 0;
      const percentage3     = total_number !== 0 ? ((counts[3] / total_number) * 100).toFixed(2) : 0;
      const percentage2     = total_number !== 0 ? ((counts[2] / total_number) * 100).toFixed(2) : 0;
      const percentage1     = total_number !== 0 ? ((counts[1] / total_number) * 100).toFixed(2) : 0;
      
  
      res.render("admin/analysis", {
        aval1: counts[1],
        aval2: counts[2],
        aval3: counts[3],
        aval4: counts[4],
        aval5: counts[5],
        total_number,
        percentage5,
        percentage4,
        percentage3,
        percentage2,
        percentage1,
      });
    })
    .catch(error => {
      console.error('Erro ao contar as avaliações:', error);
      res.status(500).send('Erro ao contar as avaliações');
    });
  });



module.exports = router