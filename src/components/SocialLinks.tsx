import React from 'react';
import { Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-6">
      {socialLinks.map(({ Icon, href, label }, index) => (
        <motion.a
          key={label}
          href={href}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-6 h-6" />
        </motion.a>
      ))}
    </div>
  );
}