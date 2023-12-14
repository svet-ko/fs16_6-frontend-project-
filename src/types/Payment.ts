import Shipment from "./Shipment";

type Payment = {
  _id: string;
  method: "credit_card" | "bank_transfer" | "paypal";
  orderId: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  shipment?: Shipment
  paymentDate: string;
};

export default Payment;
