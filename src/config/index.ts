/** @format */

import dbConfig from "./db";
import jwtConfig from "./jwt";
import mailConfig from "./mail";

export default () => ({
	db: dbConfig(),
	jwt: jwtConfig(),
	mail: mailConfig(),
});
