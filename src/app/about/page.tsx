"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import FloatingBadge from "@/components/FloatingBadge";
import { 
  ArrowLeft, 
  Mail, 
  Globe, 
  User, 
  FileText, 
  Coffee, 
  Music, 
  Users, 
  BookOpen, 
  Sparkles,
  Database,
  Code
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const Polaroid = ({ src, alt, caption, rotation = 0, delay = 0 }: { src?: string, alt: string, caption?: string, rotation?: number, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, rotate: rotation - 5 }}
    whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -10, rotate: rotation + 2, transition: { duration: 0.3 } }}
    className="bg-white p-4 pb-12 shadow-soft border border-foreground/5 rounded-sm relative group w-full max-w-[320px] mx-auto md:mx-0"
  >
    <div className="aspect-square bg-secondary-background overflow-hidden relative">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-foreground/5 font-poppins font-black text-4xl">
          IMAGE
        </div>
      )}
    </div>
    {caption && (
      <p className="absolute bottom-3 left-4 right-4 text-center font-playfair italic text-foreground/40 text-sm">
        {caption}
      </p>
    )}
  </motion.div>
);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* 1. ABOUT ME - Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors mb-12 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={fadeIn.transition}
            >
              <h1 className="text-5xl md:text-8xl font-poppins font-black leading-none tracking-tighter uppercase mb-8">
                About <br />
                <span className="font-playfair italic font-normal normal-case text-4xl md:text-8xl">Me</span>
              </h1>
              <div className="text-lg md:text-2xl text-foreground/70 font-inter leading-tight max-w-xl tracking-tight">
                <p>
                  I&apos;m a Computer Science student specializing in <span className="text-foreground font-medium">Data Science</span>, focused on building intelligent systems that solve real-world problems.
                </p>
                <p className="mt-6 text-base md:text-lg text-foreground/50 leading-relaxed">
                  By bridging AI-powered applications with scalable backends, I create technically efficient products—specializing in OCR pipelines, local LLMs, and speech systems.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-foreground/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-background rounded-bl-[100%] z-0 transition-all group-hover:scale-110" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-background rounded-full mb-8 overflow-hidden border-4 border-white shadow-soft relative">
                    <Image 
                      src="/media/img/profile4.png" 
                      alt="Pitamber Singh" 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-poppins font-black mb-2 uppercase tracking-tighter">Pitamber Singh</h3>
                  <p className="text-foreground/50 font-inter uppercase tracking-widest text-xs font-bold">Data Science Engineer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MY JOURNEY */}
      <Section className="bg-secondary-background">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-20 md:mb-32">
            <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">My Journey</h2>
            <div className="h-px flex-grow bg-foreground/10" />
          </div>

          <div className="space-y-32 md:space-y-48">
            {/* Journey Block 1 */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
              <div className="order-2 md:order-1">
                <Polaroid 
                  rotation={-3} 
                  alt="Early coding days" 
                  caption="Where it all began" 
                />
              </div>
              <motion.div 
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={fadeIn.viewport}
                transition={fadeIn.transition}
                className="order-1 md:order-2 space-y-6"
              >
                <h3 className="text-3xl md:text-5xl font-poppins font-black uppercase tracking-tighter leading-none">
                  Curiosity <br /> meets <span className="font-playfair italic font-normal normal-case text-2xl md:text-5xl">Code.</span>
                </h3>
                <p className="text-lg text-foreground/60 font-inter leading-relaxed max-w-lg">
                  What started as a simple curiosity about how things work evolved into a deep-seated passion for building practical systems. I didn&apos;t just want to understand technology; I wanted to bend it to solve real-world problems.
                </p>
                <p className="text-lg text-foreground/60 font-inter leading-relaxed max-w-lg">
                  My growth hasn&apos;t been linear. It&apos;s been a series of experiments, late-night debugging sessions, and the constant pursuit of making things just a little bit smarter.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. BEYOND THE SCREEN */}
      <Section>
        <div className="text-center mb-20 md:mb-32">
          <motion.h2 
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="text-5xl md:text-7xl font-poppins font-black uppercase tracking-tighter mb-4"
          >
            Beyond the <br /> <span className="font-playfair italic font-normal normal-case text-4xl md:text-7xl">Screen</span>
          </motion.h2>
          <motion.p 
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="text-foreground/50 font-inter"
          >
            What keeps me grounded when the monitors are off.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Reflection", 
              desc: "Finding clarity in deep conversations and quiet moments of introspection.", 
              icon: <Coffee />,
              color: "bg-orange-50"
            },
            { 
              title: "Connection", 
              desc: "Valuing time spent with friends, sharing ideas, and creating memories.", 
              icon: <Users />,
              color: "bg-blue-50"
            },
            { 
              title: "Atmosphere", 
              desc: "Music and design appreciation—finding beauty in the details of the world around me.", 
              icon: <Music />,
              color: "bg-purple-50"
            },
            { 
              title: "Growth", 
              desc: "Continuous learning and productivity through disciplined habits and new experiences.", 
              icon: <BookOpen />,
              color: "bg-green-50"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="bg-white p-10 rounded-3xl shadow-soft border border-foreground/5 flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-poppins font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-foreground/60 font-inter text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 flex justify-center">
          <Polaroid rotation={-2} alt="Chai moment" caption="Chai & Conversations" />
        </div>
      </Section>

      {/* 4. CONTACT SECTION */}
      <Section className="bg-foreground text-background">
        <div className="text-center py-12 md:py-20">
          <motion.h2 
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="text-5xl md:text-8xl font-poppins font-black mb-12 uppercase tracking-tighter leading-none"
          >
            Let&apos;s build <br /> <span className="font-playfair italic font-normal normal-case text-4xl md:text-8xl">something great</span>
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20 md:mb-32">
            {[
              { icon: <Mail />, label: "Email", href: "mailto:pitambersingh379@gmail.com" },
              { icon: <User />, label: "LinkedIn", href: "https://www.linkedin.com/in/singhpitamber/" },
              { icon: <Globe />, label: "Github", href: "https://github.com/thisispit" },
              { icon: <FileText />, label: "Resume", href: "/media/resume.pdf" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-foreground transition-all duration-300">
                  {link.icon}
                </div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-background/40">
            <p>© 2026 Pitamber Singh. All Rights Reserved.</p>
            <p className="flex items-center gap-2">
              <Sparkles size={12} /> Always building. Always learning
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
