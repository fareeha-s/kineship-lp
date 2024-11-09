import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-6 py-4 bg-white/10 rounded-[12px] border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all backdrop-blur-sm"
          required
        />
        <motion.button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sage to-coral p-3 rounded-[8px] hover:opacity-90 transition-all duration-300 hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-5 h-5 text-white" />
        </motion.button>
      </div>
      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sage text-sm"
          >
            Thanks for joining our waitlist!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}