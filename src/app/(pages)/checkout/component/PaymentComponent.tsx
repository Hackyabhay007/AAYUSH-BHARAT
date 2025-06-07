import { Address } from "@/types/customer";

interface Coupon {
  code: string;
  discount?: number;
  discountAmount?: number;
  finalPrice?: number;
}

interface ReviewComponentProps {
  address?: Address;
  coupon?: Coupon | null;
  total: number;
}

export function PaymentComponent() {
  return <div className="border p-4 rounded">[Payment Gateway Placeholder]</div>;
}

export function ReviewComponent({ address, coupon, total }: ReviewComponentProps) {  return (
    <div className="border p-4 rounded">
      <p>Address: {address?.address_line1}, {address?.city}</p>
      <p>Coupon: {coupon?.code || "None"}</p>
      <p>Total: ₹{total}</p>
      <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
    </div>
  );
}
