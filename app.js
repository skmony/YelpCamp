require('dotenv').config()

var express               =   require("express"),
    app                   =   express(),
    bodyParser            =   require("body-parser"),
    mongoose              =   require("mongoose"),
    Campground            =   require("./models/campground"),
    seedDb                =   require("./seeds"),
    Comment               =   require("./models/comment"),
    passport              =   require("passport"),
    LocalStrategy         =   require("passport-local"),
    passportLocalMongoose =   require("passport-local-mongoose"),
    User                  =   require("./models/user"),
    flash                 =   require("connect-flash"),    
    methodOverride        =   require("method-override");
    
var commentRoutes         =   require("./routes/comments"),
    campgroundRoutes      =   require("./routes/campgrounds"),
    indexRoutes            =   require("./routes/index");

var url=process.env.DATABASEURL||"mongodb://localhost/yelp_camp_v12s";  

mongoose.connect(url)
    .then(connection => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
      console.log(error.message)
     })

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
//seedDb(); //seed the database
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));
app.locals.moment = require('moment');


//Passport Configuration

app.use(require("express-session")({
    secret: "Hey there , this Shashikant Mony.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp has started");
});