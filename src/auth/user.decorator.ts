import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const User = createParamDecorator<UserResponseDTO>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.data;
  },
);
