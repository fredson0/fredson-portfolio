import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * TODO: validar cookie/sessão ou JWT emitido no login admin.
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    throw new UnauthorizedException(
      'AdminGuard não implementado — veja docs/nestjs-api-implementation.md',
    );
  }
}
