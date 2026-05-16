"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import FloatingBadge from "@/components/FloatingBadge";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail, Globe, User, FileText, Sparkles, Brain, Database, Code, Terminal, Box } from "lucide-react";

export default function Home() {
  const skills = [
    { name: "Python", icon: <Code size={14} /> },
    { name: "Java", icon: <Code size={14} /> },
    { name: "SQL", icon: <Database size={14} /> },
    { name: "Next.js", icon: <Globe size={14} /> },
    { name: "ML", icon: <Brain size={14} /> },
    { name: "Data Visualization", icon: <Sparkles size={14} /> },
    { name: "TypeScript", icon: <Code size={14} /> },
    { name: "FastAPI", icon: <Database size={14} /> },
    { name: "PyTorch", icon: <Brain size={14} /> },
    { name: "Git", icon: <Globe size={14} /> },
    { name: "Unix", icon: <Terminal size={14} /> },
    { name: "OOPS", icon: <Box size={14} /> },
  ];

  const projects = [
    {
      title: "NewsFlow",
      description: "A personalized RSS news aggregation platform delivering real-time curated news through a fast and responsive reading experience.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      githubUrl: "https://github.com/thisispit/NewsFlow",
      liveUrl: "https://newsfloww.online",
      previewAesthetic: (
        <div className="w-full h-full relative">
          <Image 
            src="/media/img/newsflow_mockup.png" 
            alt="NewsFlow Mockup" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )
    },
    {
      title: "Fake News Detection",
      description: "An intelligent machine learning system for detecting and classifying fake news articles using NLP techniques.",
      tags: ["Python", "ML", "Scikit-Learn", "NLP"],
      githubUrl: "https://github.com/thisispit/FakeNewsDetection",
      previewAesthetic: (
        <div className="w-full h-full relative">
          <Image 
            src="/media/img/Fake_news_mockup.png" 
            alt="Fake News Detection Mockup" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )
    },
    {
      title: "Drizzzle",
      description: "A modern application focused on scalable backend architecture and seamless frontend interactions.",
      tags: ["React", "FastAPI", "Python", "SQL"],
      githubUrl: "https://github.com/thisispit/Drizzzle",
      liveUrl: "https://drizzzlerain.web.app/",
      previewAesthetic: (
        <div className="w-full h-full relative">
          <Image 
            src="/media/img/Drizzzle_mockups.png" 
            alt="Drizzzle Mockup" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-[200%] md:w-[150%] aspect-square bg-secondary-background rounded-[50%_50%_0_0] z-0" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <FloatingBadge className="absolute -top-16 -left-8 md:-top-12 md:-left-12 rotate-[-10deg] scale-75 md:scale-100">
                2026
              </FloatingBadge>
              <FloatingBadge className="absolute -bottom-16 -right-8 md:-bottom-8 md:-right-16 rotate-[15deg] scale-75 md:scale-100" delay={0.5}>
                <Sparkles size={16} className="mr-2" /> Data Scientist
              </FloatingBadge>
              <h1 className="text-[18vw] md:text-[10vw] font-poppins font-black leading-[0.85] tracking-tighter uppercase text-foreground relative">
                Pitamber <br /> 
                <span className="relative">
                  Singh
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -bottom-2 md:-bottom-4 left-0 h-2 md:h-4 bg-foreground/5 rounded-full z-[-1]"
                  />
                </span>
              </h1>
            </div>
            
            <p className="max-w-xl mx-auto text-base md:text-xl font-inter text-foreground/70 mt-12 md:mt-8 mb-12">
              Engineering student specializing in data science, building intelligent systems with a focus on impact and elegance.
            </p>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 rounded-full bg-white shadow-soft border border-foreground/5"
            >
              <ArrowDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-secondary-background">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-poppins font-black mb-8 leading-none tracking-tighter uppercase">
              Hello 👋 <br /> 
              I’m <span className="font-playfair italic font-normal normal-case text-4xl md:text-7xl">Pitamber</span>
            </h2>
            <div className="text-lg md:text-2xl text-foreground/70 font-inter leading-tight max-w-xl tracking-tight">
              <p>
                I&apos;m a Computer Science student specializing in <span className="text-foreground font-medium">Data Science</span>, focused on building intelligent systems that solve real-world problems.
              </p>
              <p className="mt-6 text-base md:text-lg text-foreground/50 leading-relaxed">
                By bridging AI-powered applications with scalable backends, I create technically efficient products—specializing in OCR pipelines, local LLMs, and speech systems.
              </p>
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-xs md:text-sm font-bold uppercase tracking-widest text-foreground hover:gap-4 transition-all group">
              Learn More About Me <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
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
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-poppins font-black mb-4 uppercase tracking-tighter">Technical Arsenal</h2>
          <p className="text-sm md:text-base text-foreground/60 font-inter">The tools and technologies I use to bring ideas to life.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FloatingBadge className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-3" delay={index * 0.2}>
                <span className="mr-2 text-foreground/40">{skill.icon}</span>
                {skill.name}
              </FloatingBadge>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-secondary-background">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-poppins font-black uppercase tracking-tighter leading-none mb-6">
              Selected <br /> <span className="font-playfair italic font-normal normal-case text-4xl md:text-7xl">Projects</span>
            </h2>
            <p className="text-sm md:text-base text-foreground/60 font-inter max-w-md">A showcase of my recent work in data engineering and application development.</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto"
          >
            <Link href="https://github.com/thisispit" target="_blank" className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-poppins font-bold uppercase tracking-widest text-xs md:text-sm shadow-soft">
              View All Github <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-foreground text-background">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-5xl md:text-8xl font-poppins font-black mb-8 uppercase tracking-tighter leading-none">
            Let's build <br /> <span className="font-playfair italic font-normal normal-case text-4xl md:text-8xl">something great</span>
          </h2>
          <p className="text-sm md:text-lg text-background/60 font-inter mb-12 md:mb-16 max-w-xl mx-auto">
            I'm always open to new opportunities, collaborations, or just a friendly chat about data and design.
          </p>

          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 mb-16 md:mb-20">
            {[
              { icon: <Mail />, label: "Email", href: "mailto:pitambersingh379@gmail.com" },
              { icon: <User />, label: "LinkedIn", href: "https://www.linkedin.com/in/singhpitamber/" },
              { icon: <Globe />, label: "Github", href: "https://github.com/thisispit" },
              { icon: <FileText />, label: "Resume", href: "/media/resume.pdf" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {link.icon}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{link.label}</span>
              </motion.a>
            ))}
          </div>

          <div className="pt-12 md:pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-background/40">
            <p>© 2026 Pitamber Singh. All Rights Reserved.</p>
            <p>Always building. Always learning</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
