import ProductToCreate from "./ProductToCreate";

interface UpdationOfProductRequest {
  accessToken: string,
  id: string,
  update: Partial<ProductToCreate>
}

export default UpdationOfProductRequest;