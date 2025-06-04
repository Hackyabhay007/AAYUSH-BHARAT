import { motion } from "framer-motion";

interface PaymentSectionProps {
  paymentMethod: "COD" | "ONLINE";
  loading: boolean;
  onPaymentMethodChange: (method: "COD" | "ONLINE") => void;
  onSubmit: () => void;
}

export const PaymentSection = ({
  paymentMethod,
  loading,
  onPaymentMethodChange,
  onSubmit
}: PaymentSectionProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-premium">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <span className="w-8 h-8 bg-darkRed text-white rounded-full flex items-center justify-center mr-3 text-sm">
          3
        </span>
        Payment Methods
      </h2>
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => onPaymentMethodChange(e.target.value as "COD")}
            className="form-radio text-darkRed"
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="online"
            name="payment"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) => onPaymentMethodChange(e.target.value as "ONLINE")}
            className="form-radio text-darkRed"
          />
          <label htmlFor="online">Online Payment</label>
        </div>
      </div>
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={loading}
        className="relative overflow-hidden w-full p-4 bg-gradient-to-r from-gray-700 to-gray-500 text-black shadow-2xl border-2 rounded-lg font-medium group transition-all duration-300 disabled:opacity-70"
      >
        <span className="absolute inset-0 w-full bg-gold-shimmer -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
        <span className="relative z-10">
          {loading
            ? "Processing..."
            : `Proceed with ${
                paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"
              }`}
        </span>
      </motion.button>
    </div>
  );
};
