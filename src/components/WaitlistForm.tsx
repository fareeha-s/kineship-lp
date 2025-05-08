import { useState } from "react";
import { Sparkle, Confetti } from "phosphor-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://api.getwaitlist.com/api/v1/waiter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            waitlist_id: "21274",
            referral_link: window.location.href,
          }),
        },
      );

      if (response.ok) {
        setStatus("success");
      } else {
        console.error("Waitlist error:", await response.json());
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto lg:mx-0"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B7A]/30 to-sage/30 rounded-[14px] blur-lg group-hover:blur-xl transition-all duration-300"></div>
        <input
          type="email"
          value={
            status === "success" ? "you're in." : email
          }
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email here →"
          className="w-full px-5 py-3.5 bg-black/30 rounded-[12px] border border-white/20 
            text-white placeholder-white/60 focus:outline-none focus:ring-2 
            focus:ring-white/30 transition-all backdrop-blur-sm
            [&:-webkit-autofill]:!text-white group-hover:border-white/30
            [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(59_130_246_/_0.15)_inset]"
          required
          disabled={status === "loading" || status === "success"}
          style={{ color: status === "success" ? "#D1E1FD" : "white" }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF6B7A] p-2.5 rounded-[8px] 
            border border-white/20 hover:border-white/30
            hover:bg-[#FF6B7A] transition-all duration-300 
            hover:scale-105 disabled:opacity-50
            shadow-[0_0_15px_rgba(255,107,122,0.15)]
            hover:shadow-[0_0_20px_rgba(255,107,122,0.3)]
            active:scale-95 active:shadow-[0_0_10px_rgba(255,107,122,0.2)]
            animate-subtle-pulse"
          disabled={status === "loading" || status === "success"}
        >
          {status === "success" ? (
            <Confetti className="w-4 h-4 text-white" weight="fill" />
          ) : (
            <Sparkle className="w-4 h-4 text-white" weight="fill" />
          )}
        </button>
      </div>
      <p className="text-white/50 text-xs mt-2 text-center lg:text-left">
        {status === "success" ? "see you on launch day!" : "sign up for day one access"}
      </p>
    </form>
  );
}
