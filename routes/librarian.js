var express = require('express');
var router = express.Router();
var passport = require("passport");
var Librarian = require("../models/staff");
var postgres = require("../database/postgre");
var auth = require("../middleware/authentication");
var middleware = require("../middleware/librarian");
var libMethod = require("../method/librarian");
var StationerySQL = require("../database/stationery");
// router.get('/librarian/stationary', auth.isLoggedIn ,function(req,res){
//   var items = []
//
//   var sql = "SELECT * FROM stationary WHERE availability = TRUE"
//   postgres.query(sql, function(err, item){
//     if(err) {
//       console.log(err);
//     } else {
//       items = item.rows;
//       res.render('studentStationary', {items : items} );
//     }
//   })
//
// });

//LOGIN
router.post("/librarian/login", auth.authenticate , function(req, res){
  res.redirect("/librarian/stationary");
});

router.get('/librarian/login', function(req, res){
  res.render('librarian/login');
});
//STAIONARY - ADD
router.get("/librarian/stationery/new", auth.isLoggedIn, middleware.loadType ,function(req, res){
  // res.render('librarian/Add_Item.ejs', {types : req.types});
  res.render('librarianViews/add_item', {types: req.types});

});

router.post('/librarian/stationery', auth.isLoggedIn, middleware.getStationary, function(req, res){
  var item = req.newItem;
  libMethod.addStationary(item.id ,item.name, item.quality, item.quantity, item.description, item.type, item.picture, res, req);
})
//STATIONERY - EDIT WITHOUT PARAMS
router.get('/librarian/stationery/edit', auth.isLoggedIn, middleware.loadType ,function(req, res){

  res.render('librarianViews/edit_item', {types: req.types});
});

router.put('/librarian/stationery/update',auth.isLoggedIn, middleware.getStationary ,function(req, res){
  var item = req.newItem;
  libMethod.updateStaionery(item.id ,item.name, item.quality, item.quantity, item.description, item.type, item.picture, res, req);
});
//STATIONERY - DESTROY WITHOUT PARAMS
router.get('/librarian/stationery/destroy',auth.isLoggedIn, function(req, res){
  res.render('librarianViews/remove_item')
});

router.delete('/librarian/stationery/delete',auth.isLoggedIn, function(req, res){
  libMethod.deleteStationery(req.body.id, req, res);
});

//STATIONERY - EDIT KNOW PARAMS
router.put('/librarian/stationary/:id', function(req, res){
  res.send('connect');
});


//STATIONARY INDEX (VIEW ALL ITEM)
router.get('/librarian/stationary',auth.isLoggedIn, middleware.loadStationary ,function(req,res){
  res.render('librarianViews/view_catalogue', {items : req.items});
  // res.render('librarian/stationery', {items: req.items});
});

//STATIONARY Search
router.get('/librarian/stationary/search',auth.isLoggedIn, middleware.loadStationary ,function(req,res){
  res.render('librarianViews/view_catalogue', {items : req.items});
  // res.render('librarian/stationery', {items: req.items});
});

// register Librarian OUT OF SCOPE
// router.get('/librarian/register', function(req, res){
// //
//   var newLib = new Librarian({username: "12761767", role:"librarian"});
// Librarian.register(newLib, "12761767", function(err, student){
//     console.log(student);
// });
// //
// });

module.exports = router;