export type Role = 'CUSTOMER'|'ADMIN';

interface User {
  _id: number,
  email: string,
  password: string,
  name: string,
  role: Role,
  avatar: string,
  creationAt?: string,
  updatedAt?: string
}

export default User;