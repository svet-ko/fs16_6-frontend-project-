import Product from "../../types/Product";

const productsData: Product[] = [
  {
    id: 1,
    title: "yuuu",
    price: 105,
    description: "A very powerful computer",
    images: [
      "https://i.imgur.com/PK1WFTJ.jpeg"
    ],
    creationAt: "2023-10-04T10:07:52.000Z",
    updatedAt: "2023-10-04T10:17:07.000Z",
    category: {
      id: 16,
      name: "Electronics",
      image: "https://i.imgur.com/F1XLwX4.jpeg",
      creationAt: "2023-10-04T03:53:27.000Z",
      updatedAt: "2023-10-04T03:53:27.000Z"
    }
  },
  {
    id: 2,
    title: "Computer 3",
    price: 1000,
    description: "A very powerful computer",
    images: [
      "https://i.imgur.com/4XE4KwK.jpeg"
    ],
    creationAt: "2023-10-04T10:07:53.000Z",
    updatedAt: "2023-10-04T10:07:53.000Z",
    category: {
      id: 16,
      name: "Electronics",
      image: "https://i.imgur.com/F1XLwX4.jpeg",
      creationAt: "2023-10-04T03:53:27.000Z",
      updatedAt: "2023-10-04T03:53:27.000Z"
    }
  },
  {
    id: 3,
    title: "Cool Hoody",
    price: 60,
    description: "Cool hoodie for your good boy",
    images: [
      "https://i.imgur.com/p8AjjXS.jpeg"
    ],
    creationAt: "2023-10-04T10:07:53.000Z",
    updatedAt: "2023-10-04T10:07:53.000Z",
    category: {
      id: 17,
      name: "Clothes",
      image: "https://i.imgur.com/xYO6uDv.jpeg",
      creationAt: "2023-10-04T03:53:27.000Z",
      updatedAt: "2023-10-04T03:53:27.000Z"
    }
  },
  {
    id: 4,
    title: "Warm Hoody",
    price: 10,
    description: "A warm hoodie to keep your dog warm and cozy!",
    images: [
      "https://i.imgur.com/LlMBmIX.jpeg"
    ],
    creationAt: "2023-10-04T10:07:54.000Z",
    updatedAt: "2023-10-04T10:07:54.000Z",
    category: {
      id: 17,
      name: "Clothes",
      image: "https://i.imgur.com/xYO6uDv.jpeg",
      creationAt: "2023-10-04T03:53:27.000Z",
      updatedAt: "2023-10-04T03:53:27.000Z"
    }
  },
  {
    id: 5,
    title: "Computer 1",
    price: 1005,
    description: "A very powerful computer",
    images: [
      "https://i.imgur.com/zjLVS8N.jpeg"
    ],
    creationAt: "2023-10-04T10:07:56.000Z",
    updatedAt: "2023-10-04T10:07:56.000Z",
    category: {
      id: 16,
      name: "Electronics",
      image: "https://i.imgur.com/F1XLwX4.jpeg",
      creationAt: "2023-10-04T03:53:27.000Z",
      updatedAt: "2023-10-04T03:53:27.000Z"
    }
  }
]

export default productsData;