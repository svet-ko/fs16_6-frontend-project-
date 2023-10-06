export type Role = 'customer'|'admin';
interface User {
  id: number,
  email: string,
  password: string,
  name: string,
  role: Role,
  avatar: string,
  creationAt?: string,
  updatedAt?: string
}

export default User;