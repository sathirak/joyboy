const express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const cookieparser = require('cookie-parser');
const router = express.Router();
const util = require('util');


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

				/* const login_query = `
					UPDATE moby_login
					SET last_successful_login = CURRENT_TIMESTAMP(),
						last_login_attempt = CURRENT_TIMESTAMP(),
						current_attempt = 0,
						last_login_attempt_ip = '${req.ip}',
						last_login_attempt_status = 'success'
					WHERE mobydex = ?;
				`;

				conn_moby_user.query(login_query, [user.mobydex], (updateError, updateResults, updateFields) => {
					if (updateError) {
						console.log(updateError);
					}
				}); */

				return done(null, user);

			} else {

			/*	conn_moby_user.query(login_query, [user.mobydex], (updateError, updateResults, updateFields) => {
					if (updateError) {
						console.log(updateError);
					}
				});		*/		

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

router.get("/logout", Hyperion_Auth, (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        req.session.destroy((error) => {
            if (error) {
                console.error('Error destroying session:', error);
            } else {
                res.clearCookie('auth_cookie');
                res.send(`You have logged out`);
            }
        });
    });
});

router.post("/register", Hyperion_Auth, async (req, res, next) => {

    const { uname, pw, type } = req.body;

    console.log(uname, pw, type);

    try {

        const Hyperion_Reg_Response = await hyperion_reg.Run_Hyperion_Reg(uname, pw, type, req.ip, req.user.mobydex );

        res.send(Hyperion_Reg_Response);

    } catch (error) {

        console.error('Error during registration:', error);
        res.status(500).send('Error during registration');
    }
});


router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
	  if (err) {
		return res.status(500).json({ status: false, message: 'There was an internal server error' });
	  }
	  if (!user) {
		return res.status(200).json({ status: false, message: 'Your password is incorrect :(' });
	  }
	  req.logIn(user, (loginErr) => {
		if (loginErr) {
		  return res.status(500).json({ status: false, message: 'There was an error logging in' });
		}
		return res.status(200).json({ status: true, message: 'Login successful' });
	  });
	})(req, res, next);
  });
  

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

router.get('/list/:username', (req, res) => {
    const usernameToCheck = req.params.username;

    if (usernameToCheck !== null) {
        const searchTerm = `%${usernameToCheck}%`;

        conn_moby_user.query("SELECT moby_name FROM moby_users WHERE moby_name LIKE ?", [searchTerm], function (error, results, fields) {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                const search_results = results.map(result => result.moby_name);

                return res.json({ search_results });
            } else {
                return res.json({ search_results: [] });
            }
        });
    }
});

router.get('/list-all', (req, res) => {
    conn_moby_user.query("SELECT moby_name FROM moby_users", function (error, results, fields) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            const search_results = results.map(result => result.moby_name);
            return res.json({ search_results });
        } else {
            return res.json({ search_results: [] });
        }
    });
});



router.get('/manage/:username', async (req, res) => {
    const requested_moby_name = req.params.username;

    if (requested_moby_name !== null) {
        try {
			const mobydex_query = util.promisify(conn_moby_user.query).bind(conn_moby_user);
            const mobydex_result = await mobydex_query(
                "SELECT mobydex FROM moby_users WHERE moby_name = ?",
                [requested_moby_name]
            );

			if (mobydex_result.length > 0) {
                const mobydex_search = mobydex_result[0].mobydex;


            const moby_users_query = util.promisify(conn_moby_user.query).bind(conn_moby_user);
            const moby_users_result = await moby_users_query(
                "SELECT * FROM moby_users WHERE moby_users.mobydex = ?",
                [mobydex_search]
            );

            const moby_registration_query = util.promisify(conn_moby_user.query).bind(conn_moby_user);
            const moby_registration_result = await moby_registration_query(
                "SELECT * FROM moby_registration WHERE moby_registration.mobydex = ?",
                [mobydex_search]
            );

            const moby_login_query = util.promisify(conn_moby_user.query).bind(conn_moby_user);
            const moby_login_result = await moby_login_query(
                "SELECT * FROM moby_login WHERE moby_login.mobydex = ?",
                [mobydex_search]
            );

            const moby_allowed_query = util.promisify(conn_moby_user.query).bind(conn_moby_user);
            const moby_allowed_result = await moby_allowed_query(
                "SELECT * FROM moby_allowed WHERE moby_allowed.mobydex = ?",
                [mobydex_search]
            );

            const moby_ip_query = util.promisify(conn_moby_user.query).bind(conn_moby_user);
            const moby_ip_result = await moby_ip_query(
                "SELECT * FROM moby_ip WHERE moby_ip.mobydex = ?",
                [mobydex_search]
            );

            const combinedResult = {
                users: moby_users_result,
                registration: moby_registration_result,
                login: moby_login_result,
                allowed: moby_allowed_result,
                ip: moby_ip_result
            };

            if (usersResult.length > 0) {
                return res.json({ exists: true, data: combinedResult });
            } else {
                return res.json({ exists: false });
            }

		} else {
			return res.json({ exists: false });
		}

        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'An error occurred' });
        }
    }
});




router.get('/status', (req, res) => {
	if (req.isAuthenticated()) {
	  return res.json({ status: true });
	} else {
	  return res.json({ status: false });
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