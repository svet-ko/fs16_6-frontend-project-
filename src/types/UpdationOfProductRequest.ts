import ProductToCreate from "./ProductToCreate";

interface UpdationOfProductRequest {
  id: number,
  update: Partial<ProductToCreate>
}

export default UpdationOfProductRequest;