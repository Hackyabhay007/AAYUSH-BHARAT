export function PaymentComponent() {
  return <div className="border p-4 rounded">[Payment Gateway Placeholder]</div>;
}

export function ReviewComponent({ address, coupon, total }: any) {
  return (
    <div className="border p-4 rounded">
      <p>Address: {address?.street}, {address?.city}</p>
      <p>Coupon: {coupon?.code || "None"}</p>
      <p>Total: ₹{total}</p>
      <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
    </div>
  );
}
