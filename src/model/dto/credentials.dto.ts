import { ICredentials } from '@model/types/credentials';

export class CredentialsDTO implements ICredentials {
  login: string;
  password: string;
}
