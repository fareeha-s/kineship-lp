import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { 
    type: 'link',
    Icon: Mail, 
    href: 'mailto:hello@kineship.com', 
    label: 'Email' 
  },
  { 
    type: 'link',
    Icon: Linkedin, 
    href: 'https://linkedin.com/company/kineship', 
    label: 'LinkedIn' 
  },
  { 
    type: 'text',
    content: 'ethos',
    label: 'Ethos'
  }
];

export default function SocialLinks({ onEthosClick }: { onEthosClick: () => void }) {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link, index) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {link.type === 'text' ? (
            <button
              onClick={onEthosClick}
              className="text-white/70 hover:text-white transition-colors font-serif italic text-lg ml-2"
              aria-label={link.label}
            >
              {link.content}
            </button>
          ) : (
            <a
              href={link.href}
              className="text-white/70 hover:text-white transition-colors"
              aria-label={link.label}
            >
              <link.Icon className="w-6 h-6" />
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}