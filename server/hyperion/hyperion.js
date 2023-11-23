const express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const cookieparser = require('cookie-parser');
const router = express.Router();

//Import the middleware and database connections
const {conn_moby_user} = require('./hyperion_database');
const hyperion_reg = require('./hyperion_reg');
const {Hyperion_Control, Hyperion_Auth, Hyperion_Rate} = require('./hyperion_control');

router.use(cookieparser());

router.use(
	session({
		key: "auth_cookie",
		secret: process.env.SESSION_COOKIE_SECRET,
		store: new MySQLStore({
			host: process.env.DB_HOST,
			port: 3306,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
			sameSite: true,
			secure: false,
		},
	})
);

/* Set secure: false, to true when HTTPS is available !important    ---------------------------------    */

conn_moby_user.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
});

//Use the middleware
router.use(Hyperion_Control);
router.use(Hyperion_Rate);

//Use the passport
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


//Passportjs LocalStrategy Configuration
const credentials = {usernameField: "uname",passwordField: "pw" };

const verify_callback = (username, password, done) => {

	conn_moby_user.query("SELECT * FROM moby_users WHERE moby_name = ?", [username], function (error, results, fields) {

		if (error) {
            console.log(error);
			return done(error);
		}

		//No user with the username was found
		if (results.length === 0) {
            console.log(null, false);
			return done(null, false);
		}

		//Creating a user profile for using throught the process
		const user = {
			id: results[0].serial_number,
			mobydex: results[0].mobydex,
			username: results[0].moby_name,
			hash: results[0].moby_hash,
			salt: results[0].moby_salt,
			type: results[0].moby_type,
			mobydexStatus: results[0].mobydex_status,
			banned: results[0].banned
		};

		//User is banned
		if (user.banned) {
            console.log("||Warn => Banned user tried to login |" + user.mobydex);
            return done(null, false);
        }

		//Decrypting the password using bCrypt
		password_check(password, results[0].moby_hash, results[0].moby_salt, (validErr, isValid) => {

			if (validErr) {
                console.log(validErr);
				return done(validErr);
			}

			if (isValid) {
				console.log('Login');
				return done(null, user);

			} else {
				return done(null, false);

			}
		});
	});
};

passport.use( new LocalStrategy(credentials, verify_callback));

passport.serializeUser((user, done) => {
	done(null, user.mobydex);
});

passport.deserializeUser(function (userId, done) {
	conn_moby_user.query("SELECT * FROM moby_users where mobydex = ?", [userId], function (error, results) {
		if (error) {
			done(error, null);
		} else {
			done(null, results[0]);
		}
	});
});

function password_check(password, hash, salt, callback) {
	bcrypt.hash(password, salt, (err, hashVerify) => {
		if (err) {
			callback(err, null);
			return;
		}
		callback(null, hash === hashVerify);
	});

}

router.use((req, res, next) => {
	next();
});

router.get("/", (req, res, next) => {
	res.send('Home');
});

router.get("/logout", Hyperion_Auth,(req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.clearCookie('auth_cookie');
            res.send(`You have logged out`);
        }
    });
});

router.get("/login-success", Hyperion_Auth, (req, res, next) => {
    return res.json({ isAuthenticated: true });
});

router.get("/login-failure", (req, res, next) => {
	return res.json({ isAuthenticated: false });	
});

router.post("/register", async (req, res, next) => {

    const { uname, pw, type } = req.body;

    console.log(uname, pw, type);

    try {

        const Hyperion_Reg_Response = await hyperion_reg.Run_Hyperion_Reg(uname, pw, type, req.ip, 'arthur' );

        res.send(Hyperion_Reg_Response);

    } catch (error) {

        console.error('Error during registration:', error);
        res.status(500).send('Error during registration');
    }
});


router.post("/login", passport.authenticate("local", { 
	failureRedirect: "/login-failure",
	successRedirect: "/login-success",
	failureFlash: false
 }));

 router.get('/check/:username', (req, res) => {
    const usernameToCheck = req.params.username;

	if(usernameToCheck !== null){

    conn_moby_user.query("SELECT COUNT(*) AS count FROM moby_users WHERE moby_name = ?", [usernameToCheck], function (error, results, fields) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }

        const count = results[0].count;

        if (count > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    });
}
});


router.get('/status', (req, res) => {
	if (req.isAuthenticated()) {
		console.log(true);
	  return res.json({ isAuthenticated: true });
	} else {
		console.log(false);
	  return res.json({ isAuthenticated: false });
	}
  });
  
router.get("/protected-route", Hyperion_Auth, (req, res, next) => {
	console.log('protected route accessed');
	res.send( `${req.user.Moby_Name} You are authenticated`);
});

router.get("/notAuthorized", (req, res, next) => {
	res.send('You are not authorized to view the resource');
});

router.get("/ratelimit", (req, res, next) => {
	res.send('Too many requests from this IP, please try again later.');
});

router.get("/userAlreadyExists", (req, res, next) => {
	res.send('Sorry This username is taken>');
});



module.exports = router;