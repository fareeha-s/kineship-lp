import { useState } from 'react';
import { Send } from 'lucide-react';

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
      className="w-full max-w-md mx-auto lg:mx-0"
    >
      <div className="relative group">
        <input
          type="email"
          value={status === 'success' ? 'thanks for joining our waitlist!' : email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          className="w-full px-6 py-4 bg-white/10 rounded-[12px] border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all backdrop-blur-sm"
          required
          disabled={status === 'loading' || status === 'success'}
          style={{ color: status === 'success' ? '#6ee7b7' : 'white' }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sage to-coral p-3 rounded-[8px] hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50"
          disabled={status === 'loading' || status === 'success'}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}