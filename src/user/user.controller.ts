import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<UserResponseDTO[]> {
    return this.userService.getAllUsers();
  }
}
