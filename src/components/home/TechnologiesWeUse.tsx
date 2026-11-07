import React from 'react';
import { 
  Atom, Database, Code2, Server, Layout, FileCode, Cloud, Terminal, Compass, Palette
} from 'lucide-react';
import { motion } from 'motion/react';

export default function TechnologiesWeUse() {
  const techs = [
    { name: 'React', icon: Atom, desc: 'Interactive screens & fast web pages' },
    { name: 'Node.js', icon: Server, desc: 'Fast and secure server foundation' },
    { name: 'Express.js', icon: Code2, desc: 'Connects websites & data smoothly' },
    { name: 'MySQL', icon: Database, desc: 'Safe, organized business data storage' },
    { name: 'Tailwind CSS', icon: Layout, desc: 'Clean, modern visual styling' },
    { name: 'JavaScript', icon: FileCode, desc: 'The core language powering the web' },
    { name: 'TypeScript', icon: Terminal, desc: 'Bug-free, reliable, and solid code' },
    { name: 'Docker', icon: Cloud, desc: 'Runs apps consistently and safely' },
    { name: 'Git', icon: Compass, desc: 'Tracks changes and manages code safely' },
    { name: 'Figma', icon: Palette, desc: 'Visual screen designs you can test' },
    { name: 'Cloud Tech', icon: Cloud, desc: 'Fast cloud servers that grow with you' },
  ];

  return (
    <section id="technologies" className="py-14 lg:py-20 bg-[#08090E] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5C00] mb-2 block flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
            Our Tools &amp; Technologies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal -tracking-[1.8px] text-white mb-3">
            Technologies We <span className="italic text-[#FF5C00]">Build With</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            We build software using trusted, world-class tools to make sure your website or app is fast, safe, and easy to use.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techs.map((tech, idx) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="p-6 rounded-3xl border border-white/[0.08] bg-[#0E121E] hover:border-[#FF5C00]/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(255,92,0,0.15)] transition-all duration-300 flex flex-col items-center text-center justify-between group shadow-lg"
              >
                <div className="size-12 rounded-2xl bg-gradient-to-br from-[#FF5C00]/20 to-[#FF5C00]/5 border border-[#FF5C00]/30 text-[#FF6C00] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,92,0,0.2)]">
                  <Icon className="size-5 stroke-[1.8]" />
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#FF7A1A] transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 font-medium leading-normal">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
