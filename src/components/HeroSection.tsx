import { motion } from "framer-motion";
import { ArrowDown, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="
        relative min-h-screen flex items-center justify-center
        overflow-hidden text-center md:text-left

        /* 🌞 LIGHT MODE */
        bg-gradient-to-br from-white via-emerald-50 to-sky-100
        text-black

        /* 🌙 DARK MODE */
        dark:bg-gradient-to-br dark:from-[#050816] dark:via-[#071a2b] dark:to-[#020617]
        dark:text-white
      "
    >
      {/* 🌈 BACKGROUND GLOW (LIGHT + DARK DIFFERENT) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* LIGHT GLOW */}
        <div className="
          absolute w-[700px] h-[700px]
          bg-emerald-300/30 blur-[160px] rounded-full
          top-[-200px] left-[-200px]
          dark:hidden
        " />

        <div className="
          absolute w-[700px] h-[700px]
          bg-sky-300/30 blur-[160px] rounded-full
          bottom-[-200px] right-[-200px]
          dark:hidden
        " />

        {/* DARK GLOW */}
        <div className="
          hidden dark:block
          absolute w-[750px] h-[750px]
          bg-emerald-500/20 blur-[180px] rounded-full
          top-[-250px] left-[-250px]
        " />

        <div className="
          hidden dark:block
          absolute w-[700px] h-[700px]
          bg-blue-600/20 blur-[180px] rounded-full
          bottom-[-250px] right-[-250px]
        " />

      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-14">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="
            absolute inset-0 rounded-3xl blur-2xl
            bg-emerald-400/30 dark:bg-emerald-500/20
          " />

          <img
            src="/fotozaky1.jpg"
            className="
              relative w-[260px] md:w-[320px]
              h-[340px] md:h-[420px]
              object-cover rounded-3xl
              border border-black/10 dark:border-white/10
            "
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl"
        >
          <span className="
            text-emerald-600 dark:text-emerald-300
          ">
            👋 Welcome To My Portfolio
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-3">
            Hi, I'M <br />
            <span className="
              text-transparent bg-clip-text
              bg-gradient-to-r from-emerald-500 to-sky-500
            ">
          M. ZAKY JIBRAN
            </span>
          </h1>

          <p className="
            mt-5
            text-black/70 dark:text-white/70
          ">
            🚀 Pelajar dari MAN 1 Banda Aceh yang sangat minat
            dalam dunia teknologi, terutama dalam bidang pengembangan web.
          </p>

          {/* BUTTON */}
          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <Button
              onClick={() => scrollTo("#projects")}
              className="
                bg-emerald-500 hover:bg-emerald-400
                text-black rounded-full
              "
            >
              🚀 Project
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("#contact")}
              className="
                rounded-full
                border-black/20 dark:border-white/20
              "
            >
              📩 Contact
            </Button>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-8 justify-center md:justify-start">

            <a
              href="https://github.com/"
              target="_blank"
              className="
                flex items-center gap-2 px-4 py-2
                rounded-full
                bg-white/60 dark:bg-white/5
                border border-black/10 dark:border-white/10
                backdrop-blur-md
                hover:scale-105 transition
              "
            >
              <Github size={18} />
              GitHub
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              className="
                flex items-center gap-2 px-4 py-2
                rounded-full
                bg-white/60 dark:bg-white/5
                border border-black/10 dark:border-white/10
                backdrop-blur-md
                hover:scale-105 transition
              "
            >
              <Youtube size={18} />
              YouTube 🎬
            </a>

          </div>
        </motion.div>

      </div>

      {/* SCROLL */}
      <motion.div
        onClick={() => scrollTo("#about")}
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2
          p-3 rounded-full
          bg-black/5 dark:bg-white/5
          border border-black/10 dark:border-white/10
        "
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        ⬇️
      </motion.div>
    </section>
  );
}