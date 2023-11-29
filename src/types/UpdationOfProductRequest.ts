import ProductToCreate from "./ProductToCreate";

interface UpdationOfProductRequest {
  id: string,
  update: Partial<ProductToCreate>
}

export default UpdationOfProductRequest;