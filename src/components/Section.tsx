import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export default function Section({ children, className = "", id, fullWidth = false }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-32 overflow-hidden ${className}`}>
      <div className={fullWidth ? "w-full" : "container mx-auto px-6 md:px-12"}>
        {children}
      </div>
    </section>
  );
}
