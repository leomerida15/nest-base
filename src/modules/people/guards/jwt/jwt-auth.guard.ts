/** @format */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	handleRequest(err: any, data: any, info: any) {
		// You can throw an exception based on either "info" or "err" arguments
		if (err || !data) {
			throw err || new UnauthorizedException("NO ESTAS AUTHENTICADO");
		}
		return data;
	}
}
