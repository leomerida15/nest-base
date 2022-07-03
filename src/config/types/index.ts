/** @format */
import { Secret, SignOptions } from "jsonwebtoken";

export interface JwtConfig<K = Secret> {
	key: K;
	options: SignOptions;
}

export interface FuncJwtConfig {
	(): JwtConfig;
}
