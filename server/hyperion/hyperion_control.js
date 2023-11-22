const { conn_moby_user, conn_notice_board } = require("./hyperion_database");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 30,
	message: "Too many requests from this IP, please try again later.",
});

function Hyperion_Active(req, res, next) {

    const Mobydex = req.user.Mobydex;

    const checkQuery = 'SELECT * FROM active_logins WHERE Mobydex = ?';
    conn_notice_board.query(checkQuery, [Mobydex], (err, rows) => {
      if (err) {
        return next(err);
      }
  
      if (rows.length > 0) {

        const updateQuery = 'UPDATE active_logins SET Login_Time = CURRENT_TIMESTAMP WHERE Mobydex = ?';
        conn_notice_board.query(updateQuery, [userMobydex], (updateErr, updateResult) => {
          if (updateErr) {
            return next(updateErr);
          }
          console.log('Login time updated for existing Mobydex');
          next();

        });

      } else {

        const insertQuery = 'INSERT INTO active_logins (Mobydex, Status, Login_Time, Session_ID, IP_Address) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)';
        const ipAddress = req.ip;
        connection.query(insertQuery, [userMobydex, 'active', sessionID, ipAddress], (insertErr, insertResult) => {
          if (insertErr) {
            return next(insertErr);
          }
          console.log('New row created for Mobydex');
          next();

        });

      }
  
    });
  }

function Hyperion_Rate(req, res, next) {
    limiter(req, res, (err) => {
        if (err) {
          console.error(err);
          return res.redirect("/notAuthorized");
        }
        next();
      });
}

function Hyperion_Auth(req, res, next) {
	if (req.isAuthenticated()) {
			next();
	} else {
		return res.redirect("/notAuthorized");
	}
}

function Hyperion_Control(req, res, next) {
    
	const user_ip = req.ip;
	const ip_ban_query = "SELECT * FROM banned_ips WHERE IP_Address = ?";

	conn_notice_board.query(ip_ban_query, [user_ip], function (banError, banResults) {
		if (banError) {
			console.log(banError);
			return res.redirect("/errorPage");
		}

		if (banResults.length > 0) {
			req.logout();
			req.session.destroy();
			console.log(`||Warn from Hyperion_Control due to IP ban User(${user_ip}) with IP ${user_ip} has been force logged out`);
            return res.redirect("/errorPage");
		} else {
			next();
		}
	});
}

module.exports = {Hyperion_Control, Hyperion_Auth, Hyperion_Rate };
