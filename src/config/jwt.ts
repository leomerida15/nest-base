/** @format */

import jwt from "jsonwebtoken";

type RespJwtConfig = () => {
	key: jwt.Secret;
	options: jwt.SignOptions;
};

const jwtConfig: RespJwtConfig = () => ({
	key: process.env.JWT_KEY,
	options: { expiresIn: process.env.JWT_EXP },
});

export default jwtConfig;
