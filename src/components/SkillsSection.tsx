import { motion, useMotionValue, useTransform } from "framer-motion";

const subjects = {
  wajib: [
    { name: "Matematika", level: 90 },
    { name: "Bahasa Indonesia", level: 85 },
    { name: "Bahasa Inggris", level: 88 },
    { name: "PPKn", level: 80 },
  ],
  sains: [
    { name: "Fisika", level: 78 },
    { name: "Kimia", level: 75 },
    { name: "Biologi", level: 82 },
  ],
  lainnya: [
    { name: "Sejarah", level: 84 },
    { name: "Geografi", level: 79 },
    { name: "Seni Budaya", level: 87 },
    { name: "Olahraga", level: 92 },
  ],
};

function SubjectBar({ name, level, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>

      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2 }}
          className="
            h-full rounded-full
            bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500
            shadow-[0_0_18px_rgba(34,211,238,0.6)]
          "
        />
      </div>
    </motion.div>
  );
}

/* 💎 TILT CARD CYAN VERSION */
function TiltCard({ children }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="
        p-6 rounded-2xl
        backdrop-blur-xl

        /* LIGHT */
        bg-white/70 border border-cyan-100

        /* DARK */
        dark:bg-white/5 dark:border-cyan-500/10

        shadow-[0_10px_40px_-20px_rgba(0,0,0,0.3)]
        transition-transform duration-300
      "
    >
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

        /* LIGHT THEME (cyan soft clean) */
        bg-gradient-to-br from-cyan-50 via-white to-blue-50

        /* DARK THEME (deep navy cyan glow) */
        dark:from-[#020617]
        dark:via-[#0b1224]
        dark:to-[#020617]

        transition-colors duration-500
      "
    >
      {/* 🌊 CYAN AURORA */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
          className="
            absolute w-[500px] h-[500px]
            bg-cyan-400/20 blur-[140px]
            rounded-full
          "
        />

        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 100, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
          className="
            absolute w-[500px] h-[500px]
            bg-blue-500/20 blur-[140px]
            rounded-full right-0 bottom-0
          "
        />
      </div>

      {/* HEADER */}
      <div className="text-center mb-16">
        <span className="text-cyan-500 font-medium block mb-2">
          Pelajaran Sekolah 📚
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Kemampuan Akademik
        </h2>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">

        {/* WAJIB */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <h3 className="font-bold text-foreground">Pelajaran Wajib</h3>
          </div>

          <div className="space-y-4">
            {subjects.wajib.map((s, i) => (
              <SubjectBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </TiltCard>

        {/* SAINS */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🔬</span>
            <h3 className="font-bold text-foreground">Sains</h3>
          </div>

          <div className="space-y-4">
            {subjects.sains.map((s, i) => (
              <SubjectBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </TiltCard>

        {/* LAINNYA */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎭</span>
            <h3 className="font-bold text-foreground">Lainnya</h3>
          </div>

          <div className="space-y-4">
            {subjects.lainnya.map((s, i) => (
              <SubjectBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </TiltCard>

      </div>
    </section>
  );
}