import { CredentialsDTO } from '@model/dto/credentials.dto';
import { UserCreateDTO } from '@model/dto/userCreate.dto';
import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { UserTokenDTO } from '@model/dto/userToken.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
      ) {}

      private async validateUser(credentials: CredentialsDTO): Promise<UserResponseDTO> {
        return this.userService.findUserByCredentials(credentials);
      }
    
      public async login(credentials: CredentialsDTO): Promise<UserTokenDTO> {
        const userDTO = await this.validateUser(credentials);
        const token = await this.jwtService.signAsync(
          {
            data: userDTO,
          },
          { expiresIn: '365d' },
        );
        return { token: token, user: userDTO };
      }
    
      public async addUser(user: UserCreateDTO): Promise<UserTokenDTO> {
        const savedUser = await this.userService.createUser(user);
        const token = await this.jwtService.signAsync(
          {
            data: savedUser,
          },
          { expiresIn: '365d' },
        );
        return { token: token, user: savedUser };
      }
    
      public async getUserByToken(userDTO: UserResponseDTO): Promise<UserResponseDTO> {
        return this.userService.findUserByEmail(userDTO.email);
      }
}
