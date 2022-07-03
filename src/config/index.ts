/** @format */

import dbConfig from "./db";
import jwtConfig from "./jwt";

export default () => ({
	db: dbConfig(),
	jwt: jwtConfig(),
});
