import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  const nav = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // 🌊 background blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔥 FIXED SCROLL SPY (ANTI ERROR + STABLE)
  useEffect(() => {
    const sections = nav
      .map((i) => document.querySelector(i.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        let bestRatio = 0;
        let bestId = "";

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = `#${entry.target.id}`;
          }
        });

        if (bestId) setActive(bestId);
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // 🚀 SMOOTH SCROLL FIX (NO OFFSET BUG)
  const go = (href: string) => {
    setActive(href);
    setOpen(false);

    const el = document.querySelector(href);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      <div className="mt-4 w-[94%] md:w-[85%] relative">

        {/* 🌊 CYAN AURA */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyan-300/20 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-400/20 blur-[120px] rounded-full" />
        </div>

        {/* top line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {/* MAIN BAR */}
        <div
          className={`
            relative flex items-center justify-between
            px-5 md:px-10 h-16
            backdrop-blur-xl transition-all duration-500
            ${
              scrolled
                ? "bg-background/70 border border-border shadow-[0_10px_40px_-15px_rgba(56,189,248,0.2)]"
                : "bg-transparent"
            }
          `}
        >

          {/* BRAND */}
          <div
            onClick={() => go("#home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-1 h-6 bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            <div className="leading-tight">
              <p className="text-xs tracking-[0.3em] text-muted-foreground">
                PORTFOLIO
              </p>
              <p className="text-sm font-semibold group-hover:text-cyan-500 transition">
                M. ZAKY JIBRAN
              </p>
            </div>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((i) => (
              <button
                key={i.href}
                onClick={() => go(i.href)}
                className={`relative text-sm transition ${
                  active === i.href
                    ? "text-cyan-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {i.label}

                {/* 🔥 FIXED UNDERLINE */}
                {active === i.href && (
                  <motion.div
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                    className="
                      absolute -bottom-2 left-0 w-full h-[2px]
                      bg-cyan-400
                      shadow-[0_0_12px_rgba(56,189,248,0.5)]
                      rounded-full
                    "
                  />
                )}
              </button>
            ))}
          </nav>

          {/* ACTION */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 border border-border hover:border-cyan-400 transition"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 border border-border"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* MOBILE */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border border-border bg-background/90 backdrop-blur-xl"
            >
              <div className="flex flex-col p-4 gap-3">
                {nav.map((i) => (
                  <button
                    key={i.href}
                    onClick={() => go(i.href)}
                    className="text-left text-muted-foreground hover:text-cyan-500 transition"
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
}