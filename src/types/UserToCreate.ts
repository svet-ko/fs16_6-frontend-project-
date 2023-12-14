import { Role } from "./User";

interface UserToCreate {
  email: string,
  password: string,
  name: string,
  role: Role,
  avatar: string,
  address?: string,
  oldPassword?: string
}

export default UserToCreate;