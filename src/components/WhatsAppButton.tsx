import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phoneNumber = '03430381473',
  defaultMessage = 'Hi SaroHub, I would like to inquire about your software development, AI solutions, or digital ventures.'
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Normalize phone number for wa.me format
  const digits = (phoneNumber || '03430381473').replace(/\D/g, '');
  const internationalNumber = digits.startsWith('0')
    ? '92' + digits.slice(1)
    : digits.startsWith('92')
    ? digits
    : '92' + digits;

  const whatsappUrl = `https://wa.me/${internationalNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Automatically monitor if the chatbot window is currently open
  useEffect(() => {
    const handleChatToggle = (e: any) => {
      setIsChatOpen(!!e?.detail?.isOpen);
    };

    const checkDomState = () => {
      const chatRoot = document.getElementById('sarohub-ai-chat-root');
      if (chatRoot) {
        // If chat modal is mounted in DOM
        const modal = chatRoot.querySelector('.w-\\[calc\\(100vw-32px\\)\\]');
        setIsChatOpen(!!modal);
      }
    };

    window.addEventListener('sarohub-chat-toggled', handleChatToggle);
    const interval = setInterval(checkDomState, 500);

    return () => {
      window.removeEventListener('sarohub-chat-toggled', handleChatToggle);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[92px] right-6 z-40 flex items-center group select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip Pill expanding to the left */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.16 }}
                className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 rounded-2xl bg-[#0E121E]/95 backdrop-blur-md border border-[#25D366]/40 text-white shadow-2xl shadow-black/80 pointer-events-none"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white leading-tight">Direct WhatsApp</span>
                  <span className="text-[10px] font-mono text-[#25D366]">{phoneNumber}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Action Button directly above the Chatbot launcher */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat directly on WhatsApp: ${phoneNumber}`}
            title={`Chat directly on WhatsApp: ${phoneNumber}`}
            className="relative flex items-center justify-center size-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:shadow-[0_0_36px_rgba(37,211,102,0.8)] border border-[#4be884]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Subtle glowing pulse ring */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none opacity-60" />

            {/* WhatsApp Vector Icon */}
            <WhatsAppIcon className="w-7 h-7 fill-white drop-shadow-sm" />

            {/* Online Presence Indicator Badge */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#08090E]" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
