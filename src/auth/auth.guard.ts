import { TokenExceptions } from '@model/enum/tokenExceptions.enum';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  private async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException(TokenExceptions.INVALID, HttpStatus.FORBIDDEN);
    }
    try {
      const token = auth.split(' ')[1];
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (err) {
      const message = TokenExceptions.ERROR + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
