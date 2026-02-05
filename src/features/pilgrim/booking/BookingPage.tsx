import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentMethod } from "@/types";
import { MOCK_MUTAWIFS } from "@/constants";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const guide = MOCK_MUTAWIFS[0];
  const [step, setStep] = useState<"details" | "payment" | "success">(
    "details",
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.FPX,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <span className="material-symbols-outlined text-primary text-5xl">
            check_circle
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Booking Confirmed!
        </h2>
        <p className="text-slate-400 text-center mb-8">
          Your Mutawif will contact you shortly.
        </p>

        <div className="bg-surface-dark rounded-2xl p-4 w-full mb-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url('${guide.photoUrl}')` }}
            />
            <div>
              <p className="font-bold text-white">{guide.name}</p>
              <p className="text-sm text-slate-400">Today at 2:00 PM</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/tracking")}
          className="w-full py-4 bg-primary text-black font-bold rounded-xl"
        >
          Track Guide
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">
          {step === "details" ? "Booking Details" : "Payment"}
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {step === "details" ? (
          <>
            {/* Guide Summary */}
            <div className="bg-surface-dark rounded-2xl p-4 mb-4 border border-slate-800">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center ring-2 ring-primary/30"
                  style={{ backgroundImage: `url('${guide.photoUrl}')` }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{guide.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">
                      star
                    </span>
                    <span className="text-white">{guide.rating}</span>
                    <span className="text-slate-400">
                      • {guide.languages.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-surface-dark rounded-2xl p-4 mb-4 border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                Service Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Service Type</span>
                  <span className="text-white font-medium">Umrah Guidance</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Date</span>
                  <span className="text-white font-medium">Today</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Time</span>
                  <span className="text-white font-medium">2:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-white font-medium">3-4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Group Size</span>
                  <span className="text-white font-medium">2 pilgrims</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-surface-dark rounded-2xl p-4 mb-4 border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                Price Breakdown
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Service Fee</span>
                  <span className="text-white">SAR 200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Platform Fee</span>
                  <span className="text-white">SAR 20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">SAR 30</span>
                </div>
                <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-primary font-bold text-xl">
                    SAR 250
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Payment Methods */}
            <div className="bg-surface-dark rounded-2xl p-4 mb-4 border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                Payment Method
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod(PaymentMethod.FPX)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === PaymentMethod.FPX
                      ? "border-primary bg-primary/10"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-primary">
                    account_balance
                  </span>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-white">FPX Online Banking</p>
                    <p className="text-sm text-slate-400">
                      Pay directly from your bank
                    </p>
                  </div>
                  {paymentMethod === PaymentMethod.FPX && (
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === PaymentMethod.CREDIT_CARD
                      ? "border-primary bg-primary/10"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-primary">
                    credit_card
                  </span>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-white">Credit/Debit Card</p>
                    <p className="text-sm text-slate-400">
                      Visa, Mastercard, AMEX
                    </p>
                  </div>
                  {paymentMethod === PaymentMethod.CREDIT_CARD && (
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-surface-dark rounded-2xl p-4 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Amount</span>
                <span className="text-primary font-bold text-2xl">SAR 250</span>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-background-dark border-t border-slate-800">
        {step === "details" ? (
          <button
            onClick={() => setStep("payment")}
            className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:brightness-110 transition-all"
          >
            Proceed to Payment
          </button>
        ) : (
          <button
            onClick={handleConfirmBooking}
            disabled={isProcessing}
            className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">lock</span>
                Pay SAR 250
              </>
            )}
          </button>
        )}
      </footer>
    </div>
  );
};

export default BookingPage;
