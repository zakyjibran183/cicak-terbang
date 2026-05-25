import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Video, Coffee, Rocket, ChevronDown } from "lucide-react";

export default function AboutSection() {
  const [open, setOpen] = useState<number | null>(0);

const stats = [
  { icon: Code2, value: "Nama", label: "Zaky Jibran" },
  { icon: Rocket, value: "Lahir", label: "3 Juni 2010" },
  { icon: Coffee, value: "Hobi", label: "Bola & Teknologi" },
  { icon: Video, value: "Cita-cita", label: "Polisi" },
];

  const paragraphs = [
    {
      title: "Siapa Saya",
      content:
        "Haiii, saya M. Zaky Jibran, seorang pelajar dari MAN 1 Banda Aceh yang memiliki minat besar dalam dunia teknologi dan pengembangan web modern.",
    },
    {
      title: "Cerita & Tujuan",
      content:
        "Saya lahir di Jantho, 3 Juni 2010. Saya punya cita-cita menjadi seorang polisi, dan di sisi lain saya juga sangat suka dunia coding serta bermain bola sebagai hobi.",
    },
  ];

  return (
    <section
      id="about"
      className="
        relative py-24 md:py-32 overflow-hidden

        bg-gradient-to-br
        from-[#f5f3ff] via-[#ecfeff] to-[#fef9c3]

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#020b1a]

        text-gray-900 dark:text-white
      "
    >
      {/* glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-300/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-violet-400/30 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-medium">
            Tentang Saya
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Kenalan Singkat
          </h2>

          <div className="w-24 h-[3px] mx-auto mt-4 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">

          {/* FOTO PROFILE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[280px] h-[380px] bg-cyan-400/20 blur-3xl rounded-3xl" />

            <img
              src="/fotomemejek.jpg"
              alt="profile"
              className="
                relative z-10
                w-[260px] md:w-[300px]
                h-[340px] md:h-[400px]
                object-cover rounded-3xl
                border border-white/20
                shadow-2xl
              "
            />
          </motion.div>

          {/* TEXT + ACCORDION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Hello👋
            </h3>

            {/* ACCORDION */}
            <div className="space-y-3">
              {paragraphs.map((item, index) => (
                <div
                  key={index}
                  className="
                    border border-border
                    rounded-xl overflow-hidden
                    bg-white/40 dark:bg-white/5
                    backdrop-blur-md
                  "
                >
                  <button
                    onClick={() =>
                      setOpen(open === index ? null : index)
                    }
                    className="
                      w-full flex items-center justify-between
                      p-4 text-left font-medium
                      hover:text-cyan-500 transition
                    "
                  >
                    {item.title}
                    <ChevronDown
                      className={`transition ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {open === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-sm text-muted-foreground"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="
                    p-4 rounded-xl text-center
                    bg-white/40 dark:bg-white/5
                    backdrop-blur-md
                    border border-border
                    hover:scale-105 transition
                  "
                >
                  <stat.icon className="mx-auto mb-2 text-cyan-500" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}