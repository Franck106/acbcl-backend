import { IUserResponse } from "@model/types/userResponse";
import { IUserToken } from "@model/types/userToken";

export class UserTokenDTO implements IUserToken {
    token: string;
    user: IUserResponse;
}
