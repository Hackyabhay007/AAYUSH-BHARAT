export default function CouponInput({ onApply }: { onApply: (data: { code: string; discount: number }) => void }) {
  const applyCoupon = async (code: string) => {
    // Replace with Appwrite fetch
    if (code === "SAVE10") {
      onApply({ code, discount: 10 });
    } else {
      alert("Invalid coupon");
    }
  };

  return (
    <div className="mt-4">
      <input
        placeholder="Enter coupon code"
        className="input w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") applyCoupon(e.currentTarget.value);
        }}
      />
    </div>
  );
}
