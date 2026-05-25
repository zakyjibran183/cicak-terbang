import { motion } from "framer-motion";
import { Github, Youtube, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/zakyjibran183/cicak-terbang.git",
      label: "GitHub",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/",
      label: "YouTube",
    },
  ];

  return (
    <footer
      className="
        relative overflow-hidden
        border-t border-white/10
        bg-gradient-to-br
        from-[#fdf4ff] via-[#eef2ff] to-[#ecfeff]
        dark:from-[#020617] dark:via-[#0b1020] dark:to-[#020b1a]
        text-gray-800 dark:text-white
      "
    >
      {/* 🌈 glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-pink-400/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 blur-[120px] rounded-full bottom-[-120px] right-[-100px]" />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* LEFT BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center md:text-left space-y-2"
          >
            <h1 className="text-lg font-bold tracking-wide">
              M. Zaky Jibran
            </h1>

            <p className="text-sm text-muted-foreground max-w-xs">
              Pelajar yang sedang belajar membangun website modern dengan desain
              clean dan interaktif.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-1 text-sm text-muted-foreground">
              <span>© {currentYear}</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </motion.div>

          {/* CENTER DECOR */}
          <div className="hidden md:block text-center text-xs text-muted-foreground">
            <p>Built with passion ⚡</p>
            <p className="opacity-70">No template, pure learning journey</p>
          </div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                className="
                  group relative p-3 rounded-xl
                  bg-white/40 dark:bg-white/5
                  border border-white/20 dark:border-white/10
                  backdrop-blur-md
                  hover:scale-110 transition
                "
              >
                <s.icon className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-purple-500 transition" />

                {/* glow dot */}
                <span
                  className="
                    absolute inset-0 rounded-xl
                    bg-gradient-to-r from-purple-400/0 via-pink-400/20 to-indigo-400/0
                    opacity-0 group-hover:opacity-100 transition
                  "
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* bottom line */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          Made with <Heart className="inline w-3 h-3 text-pink-500" /> by M. Zaky Jibran
        </div>
      </div>
    </footer>
  );
}