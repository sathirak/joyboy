const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const conn_moby_user = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "moby_user",
	authPlugins: {
		mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + "\0"),
	},
	multipleStatements: true,
});

function query_runner(sql) {
    return new Promise((resolve, reject) => {
        conn_moby_user.query(sql, (error, results, fields) => {
            if (error) {
				console.log("||Error query_runner =>", sql);
                reject(error);
            } else {
				console.log("||Success query_runner => ", sql);
                resolve(results);
            }
        });
    });
}

async function user_check(Moby_Name) {

    try {

		Moby_Name = Moby_Name.toLowerCase();

        const user_checked = await query_runner("SELECT * FROM moby_users WHERE moby_name='" + Moby_Name + "'");

        console.log('||Results from user_check |', user_checked, '|');

        if (user_checked.length > 0) {
            console.error("||Error user_check: ", user_checked.length, "users have been found with a Moby_Name as ", Moby_Name);
			return
        } else if (user_checked.length === 0) {

            console.log("||Success ", user_checked.length, " users has been found with Moby_Name as|", Moby_Name, '|');
            return Moby_Name;
        }
    } catch (error) {

        console.error("||Error user_check:", error);
        throw error;
    }
}

function password_make(password, callback) {

	bcrypt.genSalt(10, (saltErr, salt) => {

		if (saltErr) {
			console.error("||Error in password_make salting ", saltErr);
			callback(saltErr, null);
			return;
		}

		bcrypt.hash(password, salt, (hashErr, genhash) => {
			if (hashErr) {
				console.error("||Error in password_make hashing ", hashErr);
				callback(hashErr, null);
				return;
			}
			console.log('||Success salt and hash has been generated for password|', password, '| as ', salt, genhash);
			callback(null, { salt, hash: genhash });
		});
	});
}




async function mobydex_make(Moby_Type) {

    try {

        const totalUsersResult = await query_runner("SELECT COUNT(*) AS totalRows FROM moby_users");
        const totalusers = totalUsersResult[0].totalRows;

        const lastSerialResult = await query_runner("SELECT MAX(Serial_Number) AS lastSerial_MySQL FROM moby_users");
        const lastserial = lastSerialResult[0].lastSerial_MySQL;

		const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);



		let Serial_Number = 1;
		console.log('Serial Number ' + totalusers + '|' + lastserial );

		if (totalusers !== lastserial){
			console.error("||Serial Number in mobydex_make does not match => total users |", totalusers, "| Serial number of last registered user |", lastserial, "|");
		} else if (totalusers === lastserial){
			console.log("||Success Serial Number matched in mobydex_make =>  total users |", totalusers, "| Serial number of last registered user |", lastserial, "|");
			Serial_Number = lastserial + 1;
		} else {
			console.error("||Serial Number error in mobydex_make");
		}

		switch (Moby_Type) {
			case 'Human':
				Moby_Type= 'I';
				break;

			case 'Robot':
				Moby_Type= 'R';
				break;

			case 'Scraper':
				Moby_Type= 'S';
				break;	

			default:
				break;
		}

        let Mobydex = Moby_Type + year + month + '-MOBY-' + Serial_Number;
		console.log("||Success Mobydex generated from mobydex_make =>  |", Mobydex, "|");
        return Mobydex;

    } catch (error) {
        console.error("||Error mobydex_make", error);
        throw error;
    }
}

async function Run_Hyperion_Reg(Moby_Name, Moby_Pass, Moby_Type, Registrar_IP, Registrar) {

	Moby_Name = await user_check(Moby_Name);

    const Mobydex = await mobydex_make(Moby_Type);


    try {
        const bcrypt_response = await new Promise((resolve, reject) => {
            password_make(Moby_Pass, (genErr, response) => {
                if (genErr) {
                    reject(genErr);
                } else {
                    resolve(response);
                }
            });
        });

        const Moby_Salt = bcrypt_response.salt;
        const Moby_Hash = bcrypt_response.hash;

		const insertion_query_moby_users = `INSERT INTO moby_users (mobydex, moby_name, moby_type, moby_hash, moby_salt, mobydex_status, banned, notes)
		VALUES ('${Mobydex}', '${Moby_Name}', '${Moby_Type}', '${Moby_Hash}', '${Moby_Salt}', 'Registered', FALSE, '.....');`;

		const insertion_query_moby_registration = `INSERT INTO moby_registration (mobydex, registration_date, registered_by, registered_ip, deregistration_date, deregistered_by, deregistered_ip)
		VALUES ('${Mobydex}', CURRENT_TIMESTAMP , '${Registrar}', '${Registrar_IP}', CURRENT_TIMESTAMP , '${Registrar}', '${Registrar_IP}');`;

		const insertion_query_moby_login = `INSERT INTO moby_login (mobydex, login_barred, current_attempt, login_code, last_login_attempt, last_login_attempt_ip, last_login_attempt_status, last_successful_login, last_failed_login)
		VALUES ('${Mobydex}', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL);`;


		const mobydex_values = [Mobydex, Moby_Name, Moby_Type, Moby_Hash, Moby_Salt, Registrar, Registrar_IP];

		const null_array = mobydex_values.some(value => value === undefined || value === null || value === '');
		
		if (null_array) {

		  console.log("||Error Run_Hyperion_Reg | Empty Values Deteceted => ");
			console.log(mobydex_values);
		  return("||Error Run_Hyperion_Reg | Empty Values Deteceted => " + mobydex_values);

		} else {

		  await query_runner(insertion_query_moby_users);
		  await query_runner(insertion_query_moby_registration);
		  await query_runner(insertion_query_moby_login);

		  const updated_row_moby_users = await query_runner(`SELECT * FROM moby_users WHERE mobydex ='${Mobydex}';`);

		  const updated_row_moby_registration = await query_runner(`SELECT * FROM moby_registration WHERE mobydex ='${Mobydex}';`);

		  const updated_row_moby_login = await query_runner(`SELECT * FROM moby_login WHERE mobydex ='${Mobydex}';`);

		  console.log( "|| Success Run_Hyperion_Reg=> Mobydex entry inserted successfully");
		  console.log(updated_row_moby_users, updated_row_moby_registration);

		  const parsed_row_moby_users = JSON.parse(JSON.stringify(updated_row_moby_users));
		  const parsed_row_moby_registration = JSON.parse(JSON.stringify(updated_row_moby_registration));
		  const parsed_row_moby_login = JSON.parse(JSON.stringify(updated_row_moby_login));
		  
		  const message = JSON.stringify({
			updated_row_moby_users: parsed_row_moby_users,
			updated_row_moby_registration: parsed_row_moby_registration,
			updated_row_moby_login: parsed_row_moby_login
		  });
		  
		  return message;

		}

       

    } catch (err) {
        console.log( "||Error Run_Hyperion_Reg => " + err);
		return( "||Error Run_Hyperion_Reg => " + err);
    }
}


module.exports = { Run_Hyperion_Reg: Run_Hyperion_Reg };

