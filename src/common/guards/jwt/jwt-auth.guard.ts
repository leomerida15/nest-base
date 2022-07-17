/** @format */

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, data: any) {
    console.log('data', data);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !data) {
      throw err || new UnauthorizedException('NO ESTAS AUTHENTICADO');
    }
    return data;
  }
}
