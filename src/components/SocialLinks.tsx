import { LinkedinLogo, PaperPlaneTilt } from "phosphor-react";
import { motion } from "framer-motion";

// type SocialLink =
//   | {
//       type: "link";
//       Icon: LucideIcon; // This would need to be a Phosphor IconType if used
//       href: string;
//       label: string;
//       className?: string;
//     }
//   | {
//       type: "text";
//       content: string;
//       label: string;
//       className?: string;
//     };

// const socialLinks: SocialLink[] = [
//   {
//     type: "text",
//     content: "ethos",
//     label: "Ethos",
//     className: "hidden lg:inline-block",
//   },
//   {
//     type: "link",
//     Icon: PaperPlaneTilt, // Example if this array was used with Phosphor
//     href: "mailto:hello@kineship.com",
//     label: "Email",
//   },
//   {
//     type: "link",
//     Icon: LinkedinLogo, // Example if this array was used with Phosphor
//     href: "https://www.linkedin.com/in/your-linkedin-profile",
//     label: "LinkedIn",
//   },
// ];

interface SocialLinksProps {
  onEthosClick: () => void;
  className?: string;
}

export default function SocialLinks({
  onEthosClick,
  className,
}: SocialLinksProps) {
  const links = [
    {
      Icon: PaperPlaneTilt,
      href: "mailto:hello@kineship.com",
      label: "Email",
    },
    {
      Icon: LinkedinLogo,
      href: "https://www.linkedin.com/company/kineship",
      label: "LinkedIn",
    },
  ];

  const ethosLink = {
    content: "ethos",
    label: "Ethos",
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Ethos Button - Desktop Only */}
      <div className="hidden lg:block">
        <motion.button
          onClick={onEthosClick}
          className="text-white hover:text-white transition-colors font-serif italic text-xl [text-shadow:_0_0_8px_rgb(255,255,255)]"
          aria-label={ethosLink.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {ethosLink.content}
        </motion.button>
      </div>

      {/* Spacer for Desktop between Ethos and Links - hidden on mobile */}
      <div className="hidden lg:block w-4"></div>

      {/* Email and LinkedIn Links Group */}
      <div className="flex items-center gap-x-3"> {/* Increased gap slightly from former ml-2 */}
        {links.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="text-white/70 hover:text-white transition-colors"
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // Adjust delay if ethos is hidden or not. For simplicity, base off index.
            transition={{ delay: index * 0.1 + (index === 0 && window.innerWidth < 1024 ? 0.1 : 0.6), duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <link.Icon size={24} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}