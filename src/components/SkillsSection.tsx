import { motion } from "framer-motion";

const subjects = {
  wajib: [
    { name: "Matematika", level: 92 },
    { name: "Bahasa Indonesia", level: 88 },
    { name: "Bahasa Inggris", level: 85 },
    { name: "PPKn", level: 80 },
  ],
  sains: [
    { name: "Fisika", level: 78 },
    { name: "Kimia", level: 75 },
    { name: "Biologi", level: 82 },
  ],
  sosial: [
    { name: "Sejarah", level: 84 },
    { name: "Geografi", level: 79 },
    { name: "Seni Budaya", level: 90 },
    { name: "Olahraga", level: 93 },
  ],
};

function SubjectBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>

      <div className="h-2 rounded-full bg-white/10 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2 }}
          className="
            h-full rounded-full
            bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500
            shadow-[0_0_18px_rgba(56,189,248,0.6)]
          "
        />
      </div>
    </motion.div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="
        p-6 rounded-2xl
        backdrop-blur-xl
        bg-white/40 dark:bg-white/5
        border border-white/30 dark:border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        transition
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="
        relative py-20 md:py-32 overflow-hidden

        /* 🌈 SOFT AURORA THEME (beda dari about) */
        bg-gradient-to-br
        from-[#fff1f2]
        via-[#f0f9ff]
        to-[#ecfdf5]

        dark:from-[#020617]
        dark:via-[#0b1220]
        dark:to-[#020a15]

        text-gray-900 dark:text-white
      "
    >
      {/* 🌫️ glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-pink-400/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-sky-400/20 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-emerald-400/10 blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="text-center mb-16">
        <span className="text-sky-500 font-medium">📚 Mapel Sekolah</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Mata Pelajaran Favorit
        </h2>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">

        <Card title="Wajib" icon="📘">
          <div className="space-y-4">
            {subjects.wajib.map((s, i) => (
              <SubjectBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </Card>

        <Card title="Sains" icon="🔬">
          <div className="space-y-4">
            {subjects.sains.map((s, i) => (
              <SubjectBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </Card>

        <Card title="Sosial & Lainnya" icon="🌍">
          <div className="space-y-4">
            {subjects.sosial.map((s, i) => (
              <SubjectBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </Card>

      </div>
    </section>
  );
}