type PaymentToCreate = {
  method: "credit_card" | "bank_transfer" | "paypal";
  orderId: string;
  userId: string;
  bankName: string;
  shipmentInfo: {
    shippingPrice: number;
  };
  accountNumber: string;
};

export default PaymentToCreate;
