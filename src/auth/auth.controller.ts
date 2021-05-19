import { CredentialsDTO } from '@model/dto/credentials.dto';
import { UserCreateDTO } from '@model/dto/userCreate.dto';
import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { UserTokenDTO } from '@model/dto/userToken.dto';
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
      ) {}
    
      @Post('login')
      @HttpCode(200)
      public async login(@Body() credentials: CredentialsDTO): Promise<UserTokenDTO> {
        return this.authService.login(credentials);
      }
    
      @Post('register')
      public async register(@Body() userDTO: UserCreateDTO): Promise<UserTokenDTO> {
        return this.authService.addUser(userDTO);
      }
    
      @Get('me')
      @UseGuards(AuthGuard)
      public getUser(@User() user: UserResponseDTO): Promise<UserResponseDTO> {
        return this.authService.getUserByToken(user);
      }
}
