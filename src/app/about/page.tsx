"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import FloatingBadge from "@/components/FloatingBadge";
import { ArrowLeft, Coffee, Code, Heart, Utensils, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors mb-8 md:mb-12 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-poppins font-black leading-none tracking-tighter uppercase mb-8">
                About <br /> <span className="font-playfair italic font-normal normal-case text-4xl md:text-8xl">Me</span>
              </h1>
              <div className="space-y-6 text-lg md:text-2xl font-inter leading-relaxed text-foreground/80">
                <p>
                  I&apos;m a full-stack developer who thrives on creating products that solve real-world problems. Currently delivering projects at TEN, I&apos;m passionate about making tech work for people—crafting solutions that simplify life :)
                </p>
                <p>
                  In the past few months, I&apos;ve delivered 5 projects and had the opportunity to lead 3 of them.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 mt-10 md:mt-12">
                <FloatingBadge className="bg-white text-xs md:text-sm px-4 py-2 md:px-6 md:py-3">
                  <Code size={16} className="mr-2" /> Developer at work
                </FloatingBadge>
                <FloatingBadge className="bg-white text-xs md:text-sm px-4 py-2 md:px-6 md:py-3" delay={0.5}>
                  <Coffee size={16} className="mr-2" /> Powered by coffee
                </FloatingBadge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square md:aspect-[4/5] bg-secondary-background rounded-3xl overflow-hidden shadow-soft"
            >
              <div className="absolute inset-0 flex items-center justify-center text-foreground/10 font-poppins font-black text-4xl md:text-6xl rotate-[-10deg] select-none text-center px-4">
                PITAMBER
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coding Journey */}
      <Section className="bg-secondary-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-grow bg-foreground/10" />
            <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-foreground/40 whitespace-nowrap">My Coding Journey</h2>
            <div className="h-px flex-grow bg-foreground/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-base md:text-lg font-inter text-foreground/70 leading-relaxed order-2 md:order-1">
              <p>
                My journey into coding started in college, where I had no prior experience but was tasked with submitting a solution for problem statement for Smart India Hackathon as a semester project.
              </p>
              <p>
                After countless sleepless nights, we developed <span className="font-bold text-foreground">LocalScene</span>, a Django-based cultural event app that helped organize and streamline college events.
              </p>
              <p>
                This project was my first real taste of development and sparked my passion for building things that matter.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-foreground/5 text-center order-1 md:order-2">
              <div className="inline-flex p-4 rounded-2xl bg-background mb-6">
                <Trophy size={32} className="text-foreground/40" />
              </div>
              <h3 className="text-xl md:text-2xl font-poppins font-black uppercase tracking-tighter mb-2">Where it all began :)</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Smart India Hackathon</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Off-Screen Adventures */}
      <Section>
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-7xl font-poppins font-black uppercase tracking-tighter mb-4">Off-Screen <br /> <span className="font-playfair italic font-normal normal-case text-4xl md:text-7xl">Adventures</span></h2>
          <p className="text-sm md:text-base text-foreground/50 font-inter">What keeps me inspired when I&apos;m not behind the screen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Cooking",
              subtitle: "Avocado and Egg Toast 🥑",
              desc: "I find peace in the kitchen, experimenting with new recipes. There's something incredibly satisfying about creating something delicious with my own hands.",
              icon: <Utensils />,
              color: "bg-green-100/50"
            },
            {
              title: "Basketball",
              subtitle: "Court time",
              desc: "Whether it's playing a casual pick-up game or just shooting hoops alone, I love staying active and challenging myself on the court.",
              icon: <Trophy />,
              color: "bg-orange-100/50"
            },
            {
              title: "Philosophy",
              subtitle: "Chai and Marcus Aurelius",
              desc: "I'm a huge fan of deep philosophical discussions. I can talk about everything from existentialism to the complexities of human nature.",
              icon: <BookOpen />,
              color: "bg-blue-100/50"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-soft border border-foreground/5 group"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {item.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-poppins font-black uppercase tracking-tighter mb-1">{item.title}</h3>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/30 mb-6">{item.subtitle}</p>
              <p className="text-foreground/70 font-inter text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Footer Contact */}
      <Section className="bg-foreground text-background">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-3xl md:text-6xl font-poppins font-black mb-8 uppercase tracking-tighter">Have a project in mind?</h2>
          <a href="mailto:pitambersingh379@gmail.com" className="text-xl md:text-4xl font-playfair italic mb-12 block hover:opacity-70 transition-opacity break-words px-4">
            pitambersingh379@gmail.com
          </a>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link href="/#contact" className="inline-flex px-8 py-4 md:px-10 md:py-5 bg-background text-foreground rounded-full font-poppins font-bold uppercase tracking-widest text-xs md:text-sm shadow-soft hover:scale-105 transition-transform">
              Get In Touch
            </Link>
            <a href="/media/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-4 md:px-10 md:py-5 border border-white/20 text-background rounded-full font-poppins font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white/10 transition-colors">
              Download Resume
            </a>
          </div>

          <div className="pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-background/40">
            <p>© 2026 Pitamber Singh. All Rights Reserved.</p>
            <p>Always building. Always learning</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
