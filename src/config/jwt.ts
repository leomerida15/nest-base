/** @format */

import { FuncJwtConfig } from "./types";

const jwtConfig: FuncJwtConfig = () => ({
	key: process.env.JWT_KEY,
	options: { expiresIn: process.env.JWT_EXP },
});

export default jwtConfig;
