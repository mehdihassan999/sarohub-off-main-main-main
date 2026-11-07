import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Globe, Cpu, Code, ArrowRight, X, CheckCircle2, 
  Layers, MessageSquare, ChevronRight, HelpCircle,
  Palette, PenTool, TrendingUp, Smartphone, ShoppingBag, Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import RollText from '../common/RollText';
import DiagonalArrow from '../common/DiagonalArrow';

interface ServicesProps {
  services: any[];
}

const fallbackServices = [
  {
    id: 1,
    title: 'Custom Software Development',
    slug: 'custom-software',
    category: 'Business Software',
    banner_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Custom software, management portals, and automated business tools built around how your company actually works.',
    description: 'We build custom software designed around your daily business needs. From staff management portals to automated workflow tools, our apps are reliable, secure, and easy for your team to use.',
    benefits: [
      'Custom-built around your exact business routine and steps',
      'Fast, reliable performance that handles your growing business',
      'Easily connects with payment tools, messaging, and other software',
      'Clean, tested code with full team training and ongoing support'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Google Cloud'],
    faqs: [
      {
        question: 'How do you make sure the software matches what we need?',
        answer: 'We start by listening to your exact business steps and sharing clickable screen designs, keeping you updated every week with live demos.'
      }
    ]
  },
  {
    id: 2,
    title: 'Web Application Development',
    slug: 'web-development',
    category: 'Websites & Apps',
    banner_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Fast, modern, and easy-to-use websites and web applications that work smoothly on phones, tablets, and computers.',
    description: 'We build fast, secure websites and web applications that your visitors will love. Clean, comfortable navigation combined with reliable behind-the-scenes systems.',
    benefits: [
      'Instant page loading so visitors never have to wait',
      'Clear, modern screen layouts optimized for phones and laptops',
      'Secure logins with custom access for staff, managers, and customers',
      'Built with Google search best practices to help more people find you'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    faqs: [
      {
        question: 'Can you update or redesign our existing website or software?',
        answer: 'Yes! We review your existing setup, fix slow or outdated code, and upgrade your system to modern, faster technology.'
      }
    ]
  },
  {
    id: 3,
    title: 'Mobile App Development',
    slug: 'mobile-development',
    category: 'Mobile Apps',
    banner_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Smooth, reliable mobile apps for both iPhone (iOS) and Android, with offline access and push notifications.',
    description: 'We design and develop mobile apps that people enjoy opening every day. Fast, responsive, and available on both the Apple App Store and Google Play Store.',
    benefits: [
      'Fast, smooth experience on both iPhones and Android phones',
      'Works reliably even when internet connection is weak',
      'Uses phone features like notifications, camera, location, and face unlock',
      'We handle full publishing to the Apple App Store and Google Play'
    ],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'iOS', 'Android', 'Firebase'],
    faqs: [
      {
        question: 'Do you build for both iPhone and Android at the same time?',
        answer: 'Yes. We use modern tools that allow your app to run on both iPhone and Android without having to build and pay for two separate apps.'
      }
    ]
  },
  {
    id: 4,
    title: 'SaaS Product Development',
    slug: 'saas-development',
    category: 'Online Platforms',
    banner_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Online subscription platforms with user sign-up, automated monthly billing, customer accounts, and an admin dashboard.',
    description: 'We turn your software product idea into a complete online business. Includes automated subscriptions, client accounts, payment processing, and security.',
    benefits: [
      'Separate, secure accounts for every client organization',
      'Automated credit card billing, invoices, and payment receipts',
      'Safe cloud hosting with regular automated backups',
      'Flexible foundation ready to add new features easily'
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Stripe', 'Google Cloud', 'Docker', 'Redis'],
    faqs: [
      {
        question: 'Can you help turn our new product idea into a working first version?',
        answer: 'Yes. We take your concept, design the screens, build the core features, connect automatic payments, and launch it live.'
      }
    ]
  },
  {
    id: 5,
    title: 'AI & Workflow Automation',
    slug: 'ai-automation',
    category: 'Smart AI Tools',
    banner_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Smart AI tools, automatic document reading, chat helpers, and automated tasks that eliminate repetitive manual work.',
    description: 'We help your business use practical artificial intelligence to save hours of office work — from reading invoices and paperwork automatically to answering customer questions.',
    benefits: [
      'Save hours of staff time by automating manual data entry',
      'Connect smart AI tools safely to your business documents',
      'Helpful automations for customer support, sales, and orders',
      'Complete privacy — your sensitive business data stays protected'
    ],
    technologies: ['Python', 'OpenAI', 'Gemini API', 'LangChain', 'FastAPI', 'PostgreSQL'],
    faqs: [
      {
        question: 'Is our private company information safe when using AI?',
        answer: 'Yes, 100%. We use strict privacy rules so your business files and customer data are never shared publicly or used to train external models.'
      }
    ]
  },
  {
    id: 6,
    title: 'UI/UX Design & Product Strategy',
    slug: 'ui-ux-design',
    category: 'App & Web Design',
    banner_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Easy-to-use screen designs, clickable interactive prototypes, and clean app layouts that your customers love using.',
    description: 'Great apps start with simple design. We create beautiful screen mockups you can test and click through on your phone before any code is written.',
    benefits: [
      'Clickable prototypes so you can test the app before building',
      'Clear layouts tailored to your real customers’ daily habits',
      'Consistent colors, readable fonts, and comfortable buttons',
      'Works seamlessly across mobile phones, tablets, and desktop computers'
    ],
    technologies: ['Figma', 'Design Systems', 'Prototyping', 'Tailwind CSS', 'Storybook'],
    faqs: [
      {
        question: 'Do we get to test clickable mockups before coding begins?',
        answer: 'Always. We provide interactive prototypes so you can tap through all pages on your phone or laptop before development starts.'
      }
    ]
  },
  {
    id: 7,
    title: 'Digital Growth & Marketing',
    slug: 'digital-marketing',
    category: 'Marketing & SEO',
    banner_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=600',
    short_description: 'Digital marketing, Google search optimization, online ads, and proven strategies to get more customers and sales.',
    description: 'We help businesses and products grow online. From ranking higher on Google searches to targeted online advertising and turning website visitors into paying clients.',
    benefits: [
      'SEO setup to help your website rank higher on Google',
      'Targeted online ad campaigns that bring in real customer inquiries',
      'Easy-to-read reports showing where your website traffic comes from',
      'Continuous improvements to convert more visitors into sales'
    ],
    technologies: ['Technical SEO', 'Google Analytics 4', 'Paid Ads', 'CRO', 'Search Console'],
    faqs: [
      {
        question: 'How do you help our business get more real customers?',
        answer: 'We combine Google search visibility with clear website messaging and targeted ads, focusing on real inquiries and sales rather than empty clicks.'
      }
    ]
  }
];

const parseArrayField = (field: any): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field.filter(Boolean);
  if (typeof field === 'string') {
    const trimmed = field.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch { /* ignore */ }
    }
    return trimmed.split(/\r?\n|,/).map(s => s.trim()).filter(Boolean);
  }
  return [];
};

export default function OurServices({ services }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };

    if (selectedService) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  const displayServices = services && services.length > 0 ? services : fallbackServices;

  const categoryFilters = [
    { id: 'all', label: 'All Services' },
    { id: 'software', label: 'Software Development' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'design', label: 'Product & Design' },
    { id: 'growth', label: 'Digital Growth' }
  ];

  const matchesCategory = (item: any, catId: string) => {
    if (catId === 'all') return true;
    const text = `${item.title || ''} ${item.category || ''} ${item.slug || ''}`.toLowerCase();
    if (catId === 'software') {
      return text.includes('software') || text.includes('web') || text.includes('mobile') || text.includes('saas') || text.includes('crm') || text.includes('commerce') || text.includes('engineering');
    }
    if (catId === 'ai') {
      return text.includes('ai') || text.includes('automation') || text.includes('workflow') || text.includes('agent');
    }
    if (catId === 'design') {
      return text.includes('ui') || text.includes('ux') || text.includes('design') || text.includes('product') || text.includes('prototyp') || text.includes('brand');
    }
    if (catId === 'growth') {
      return text.includes('growth') || text.includes('marketing') || text.includes('seo') || text.includes('ads') || text.includes('lead');
    }
    return true;
  };

  const filteredServices = displayServices.filter(item => matchesCategory(item, activeCategory));

  return (
    <section id="services" className="py-14 lg:py-20 bg-[#08090E] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5C00] mb-2 block flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal -tracking-[1.8px] text-white">
              Our <span className="italic text-[#FF5C00]">Services</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="group px-7 py-3.5 inline-flex gap-2.5 items-center bg-gradient-to-r from-[#FF5C00] via-[#FF6C00] to-[#FF8526] text-sm font-semibold text-white rounded-full shadow-[0_0_24px_rgba(255,92,0,0.38)] hover:shadow-[0_0_36px_rgba(255,92,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0 border border-[#FFA566]/30"
          >
            <RollText>BOOK CONSULTATION</RollText>
            <DiagonalArrow size={18} />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categoryFilters.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer font-medium border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5C00] to-[#FF7A1A] text-white border-[#FFA566]/30 shadow-[0_0_15px_rgba(255,92,0,0.4)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Vaboulus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((item, idx) => {
            const techList = parseArrayField(item.technologies);
            return (
              <motion.article
                key={item.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-6 sm:p-7 rounded-3xl border border-white/[0.08] bg-[#0E121E] hover:border-[#FF5C00]/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(255,92,0,0.15)] transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 uppercase">
                    <span className="text-[#FF7A1A] font-bold">0{idx + 1} / SERVICE</span>
                    <span className="font-semibold text-slate-400">{item.category || 'Engineering'}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#FF7A1A] transition-colors tracking-tight">
                    <Link to={`/services/${item.slug || item.id}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-400 mb-5 leading-relaxed line-clamp-3 font-normal">
                    {item.short_description || item.description}
                  </p>

                  {techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {techList.slice(0, 4).map((tech, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-slate-300 text-[11px] font-mono font-medium rounded-md shadow-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer"
                  >
                    Quick View
                  </button>

                  <Link
                    to={`/services/${item.slug || item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FF5C00] group-hover:text-[#FFA043] font-bold"
                  >
                    <span>Full Details</span>
                    <span className="transition-transform group-hover:translate-x-1 font-sans">&rarr;</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#0E121E] border border-white/[0.12] text-white shadow-2xl z-10 p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF5C00] block mb-1">
                    {selectedService.category || 'Service'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {selectedService.description || selectedService.short_description}
              </p>

              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-mono text-xs uppercase text-[#FF5C00] tracking-wider mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 border-t border-white/[0.08] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2.5 rounded-full border border-white/[0.1] text-xs font-mono uppercase tracking-wider text-slate-300 hover:bg-white/[0.06] cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to={`/services/${selectedService.slug || selectedService.id}`}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF5C00] to-[#FF7A1A] text-white text-xs font-mono uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] transition-all font-semibold"
                >
                  Full Service Page &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
