import { useState, useEffect } from "react";
import { Sparkle, Confetti } from "phosphor-react";
import { motion } from "framer-motion";

interface WaitlistFormProps {
  // optional additional delay before the form fades in
  delay?: number;
  isSmallScreen?: boolean;
}

export default function WaitlistForm({ delay = 2.0, isSmallScreen = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);
  }, []);

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

  const placeholderColorClass = isIOS ? "placeholder-neutral-400" : "placeholder-white/60";
  const borderColorClass = isIOS ? "border-neutral-300/75" : "border-white/20";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto lg:mx-0"
    >
      <div className="relative group">
        {!isIOS && !isSmallScreen && (
          <motion.div
            className="absolute -inset-1 rounded-[14px] bg-gradient-to-r from-[#FF6B7A]/30 to-sage/30 blur-lg group-hover:blur-xl transition-shadow duration-300 ease-in-out"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay
            }}
            style={{ willChange: 'transform, opacity, filter' }}
          />
        )}
        <motion.input
          type="email"
          value={
            status === "success" ? "you're in." : email
          }
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email here →"
          className={`w-full px-5 py-3.5 bg-black/30 rounded-[12px] border ${borderColorClass} 
            text-white ${placeholderColorClass} focus:outline-none focus:ring-2 
            focus:ring-white/30 transition-all backdrop-blur-sm
            [&:-webkit-autofill]:!text-white group-hover:border-white/30
            [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(59_130_246_/_0.15)_inset]`}
          required
          disabled={status === "loading" || status === "success"}
          style={{ 
            color: status === "success" ? "#D1E1FD" : "white",
            willChange: 'transform, opacity'
          }}
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay
          }}
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
    </motion.form>
  );
}
