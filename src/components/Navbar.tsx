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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const go = (href: string) => {
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      <div className="mt-4 w-[94%] md:w-[85%] relative">

        {/* 🌈 NEON BACKGROUND AURA */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-400/20 blur-[90px] rounded-full animate-pulse" />
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
        </div>

        {/* TOP LINE */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

        {/* MAIN BAR */}
        <div
          className={`
            relative flex items-center justify-between
            px-5 md:px-10 h-16
            transition-all duration-500

            backdrop-blur-xl

            ${
              scrolled
                ? "bg-background/80 border border-border shadow-[0_10px_40px_-10px_rgba(34,211,238,0.25)]"
                : "bg-transparent"
            }
          `}
        >
          {/* LEFT BRAND */}
          <div
            onClick={() => go("#home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-1 h-6 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

            <div className="leading-tight">
              <p className="text-xs tracking-[0.3em] text-muted-foreground">
                PORTFOLIO
              </p>
              <p className="text-sm font-semibold tracking-wide group-hover:text-cyan-400 transition">
                M. ZAKY JIBRAN
              </p>
            </div>
          </div>

          {/* CENTER NAV */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {nav.map((i) => (
              <button
                key={i.href}
                onClick={() => go(i.href)}
                className={`
                  relative text-sm transition duration-300
                  ${
                    active === i.href
                      ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {i.label}

                {/* neon indicator */}
                {active === i.href && (
                  <motion.div
                    layoutId="navFocus"
                    className="
                      absolute -bottom-2 left-0 w-full h-[2px]
                      bg-cyan-400
                      shadow-[0_0_12px_rgba(34,211,238,0.8)]
                      rounded-full
                    "
                  />
                )}
              </button>
            ))}
          </nav>

          {/* RIGHT ACTION */}
          <div className="flex items-center gap-3">
            {/* theme */}
            <button
              onClick={toggleTheme}
              className="
                p-2 border border-border
                hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]
                hover:border-cyan-400
                transition
                active:scale-95
              "
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* mobile */}
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
              className="md:hidden overflow-hidden border border-border border-t-0 bg-background/90 backdrop-blur-xl"
            >
              <div className="flex flex-col p-4 gap-3">
                {nav.map((i) => (
                  <button
                    key={i.href}
                    onClick={() => go(i.href)}
                    className="text-left text-muted-foreground hover:text-cyan-400 transition"
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