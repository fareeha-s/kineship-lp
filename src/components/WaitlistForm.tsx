import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://api.getwaitlist.com/api/v1/waiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          waitlist_id: '21274',
          referral_link: window.location.href,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        console.error('Waitlist error:', await response.json());
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xs mx-auto lg:mx-0 -mb-2"
    >
      <div className="relative group">
        <input
          type="email"
          value={status === 'success' ? 'thanks for joining our waitlist!' : email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          className="w-full px-5 py-2.5 bg-white/5 rounded-[12px] border border-white/10 
            text-white placeholder-white/40 focus:outline-none focus:ring-2 
            focus:ring-sage/50 transition-all backdrop-blur-sm
            [&:-webkit-autofill]:!text-white
            [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(59_130_246_/_0.15)_inset]"
          required
          disabled={status === 'loading' || status === 'success'}
          style={{ color: status === 'success' ? '#D1E1FD' : 'white' }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sage to-[#FF6B7A] p-2 rounded-[8px] hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50"
          disabled={status === 'loading' || status === 'success'}
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
}