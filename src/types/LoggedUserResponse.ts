import User from "./User";

export interface LoggedUserResponse {
    token: string;
    user: User;
  };