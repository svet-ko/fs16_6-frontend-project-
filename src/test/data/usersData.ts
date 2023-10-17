import User from "../../types/User";

const usersData: User[] = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://picsum.photos/640/640?r=5207",
    creationAt: "2023-09-27T02:42:27.000Z",
    updatedAt: "2023-09-27T02:42:27.000Z",
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://picsum.photos/640/640?r=9443",
    creationAt: "2023-09-27T02:42:27.000Z",
    updatedAt: "2023-09-27T02:42:27.000Z",
  },
  {
    id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://picsum.photos/640/640?r=9185",
    creationAt: "2023-09-27T02:42:27.000Z",
    updatedAt: "2023-09-27T02:42:27.000Z",
  },
];

export default usersData;
