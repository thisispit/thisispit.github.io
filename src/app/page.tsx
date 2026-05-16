"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import FloatingBadge from "@/components/FloatingBadge";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail, Globe, User, FileText, Sparkles, Brain, Database, Code } from "lucide-react";

export default function Home() {
  const skills = [
    { name: "Python", icon: <Code size={14} /> },
    { name: "SQL", icon: <Database size={14} /> },
    { name: "Machine Learning", icon: <Brain size={14} /> },
    { name: "Data Visualization", icon: <Sparkles size={14} /> },
    { name: "React", icon: <Code size={14} /> },
    { name: "FastAPI", icon: <Database size={14} /> },
    { name: "PyTorch", icon: <Brain size={14} /> },
  ];

  const projects = [
    {
      title: "Predictive Analytics Engine",
      description: "A machine learning pipeline for forecasting market trends with 94% accuracy using ensemble methods.",
      tags: ["Python", "Scikit-Learn", "Pandas"],
      githubUrl: "#",
    },
    {
      title: "Neural Vision API",
      description: "Real-time object detection and classification system built for high-throughput image streams.",
      tags: ["PyTorch", "FastAPI", "Docker"],
      githubUrl: "#",
    },
    {
      title: "Data Insights Dashboard",
      description: "Interactive visualization platform for multi-dimensional data analysis with real-time filtering.",
      tags: ["React", "D3.js", "SQL"],
      githubUrl: "#",
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
            <div className="space-y-6 text-base md:text-xl text-foreground/70 font-inter leading-relaxed">
              <p>
                I am a Data Science Engineer passionate about turning complex data into actionable insights. My approach combines rigorous mathematical foundations with modern software engineering practices.
              </p>
              <p>
                Currently focusing on deep learning architectures and scalable data pipelines, I strive to create solutions that are not only functional but also intuitive and beautifully designed.
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
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-soft border border-foreground/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-background rounded-bl-[100%] z-0 transition-all group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-background rounded-2xl mb-6 overflow-hidden border border-foreground/5">
                  <Image 
                    src="/media/img/profile2.jpg" 
                    alt="Pitamber Singh" 
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-poppins font-black mb-2 uppercase tracking-tighter">Pitamber Singh</h3>
                <p className="text-foreground/50 font-inter mb-6 uppercase tracking-widest text-[10px] md:text-xs font-bold">Data Science Engineer</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-2xl border border-foreground/5">
                    <Database size={20} className="text-foreground/40 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 leading-none mb-1">Focus</p>
                      <p className="text-xs md:text-sm font-medium">Machine Learning & Big Data</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-2xl border border-foreground/5">
                    <Code size={20} className="text-foreground/40 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 leading-none mb-1">Tech</p>
                      <p className="text-xs md:text-sm font-medium">Python, React, SQL</p>
                    </div>
                  </div>
                </div>
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
            <Link href="https://github.com" target="_blank" className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-poppins font-bold uppercase tracking-widest text-xs md:text-sm shadow-soft">
              View All Github <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <ProjectCard {...project} image="/placeholder.jpg" />
            </motion.div>
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
              { icon: <Mail />, label: "Email", href: "mailto:hello@pitamber.com" },
              { icon: <User />, label: "LinkedIn", href: "#" },
              { icon: <Globe />, label: "Github", href: "#" },
              { icon: <FileText />, label: "Resume", href: "#" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
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
