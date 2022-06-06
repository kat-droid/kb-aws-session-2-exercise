const secretsManager = require("./secretsManager");

module.exports.getDBConfig = async () => {
	var secretName = process.env.SECRET_NAME;
	const secrets = await secretsManager.getSecrets(secretName);
	
	host = secrets["host"];
	username = secrets["username"];
	password = secrets["password"];
	database = secrets["database"];
	port = secrets["port"];

	console.log("sm host: ", host);
	
	return { host, username, password, database, port };

};