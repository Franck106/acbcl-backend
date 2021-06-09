import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@model/entities/user.entity';
import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { UserExceptions } from '@model/enum/userExceptions.enum';
import { CredentialsDTO } from '@model/dto/credentials.dto';
import { UserCreateDTO } from '@model/dto/userCreate.dto';
import { Credentials } from '@model/entities/credentials.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findUserByEmail(userEmail: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException(UserExceptions.NOT_EXISTS);
    }
    return UserResponseDTO.fromEntity(user);
  }

  public async findUserByCredentials(
    credentialsDTO: CredentialsDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.userRepository.findOne({
      email: credentialsDTO.login,
    });
    if (!user) {
      throw new NotFoundException(UserExceptions.NOT_EXISTS);
    }
    const match = await user.checkPassword(credentialsDTO.password);
    if (!match) {
      throw new ForbiddenException(UserExceptions.INVALID_PASSWORD);
    }
    return UserResponseDTO.fromEntity(user);
  }

  public async createUser(userDTO: UserCreateDTO): Promise<UserResponseDTO> {
    const checkIfExists = await this.userRepository.findOne({
      email: userDTO.email,
    });
    if (checkIfExists) {
      throw new ConflictException(UserExceptions.ALREADY_EXISTS);
    }

    const credentials = new Credentials(userDTO.email, userDTO.password);

    const user = await this.userRepository.save(
      Object.assign(new User(), userDTO),
    );

    user.credentials = credentials;
    await this.userRepository.save(user);

    return UserResponseDTO.fromEntity(user);
  }

  public async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.find();
    return users.map(user => UserResponseDTO.fromEntity(user));
  }
}
