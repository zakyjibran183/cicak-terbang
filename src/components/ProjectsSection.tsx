import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const movies = [
  {
    title: "🌌 Dune",
    description: "Perjuangan di planet gurun yang penuh politik dan kekuasaan.",
    image: "/dune.jpg",
    color: "from-amber-400 via-orange-500 to-yellow-600",
  },
  {
    title: "🤖 Ex Machina",
    description: "AI yang mulai memahami kesadaran manusia.",
    image: "/machina.jpg",
    color: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    title: "🧬 Blade Runner 2049",
    description: "Masa depan manusia dan android yang hampir tak bisa dibedakan.",
    image: "/blade.jpg",
    color: "from-indigo-400 via-purple-500 to-slate-900",
  },
  {
    title: "⏳ Tenet",
    description: "Misi rahasia dengan konsep waktu yang berbalik.",
    image: "/tenet.jpg",
    color: "from-teal-400 via-cyan-500 to-blue-700",
  },
  {
    title: "🪐 Avatar",
    description: "Dunia Pandora yang penuh keindahan dan konflik manusia.",
    image: "/avatar.jpg",
    color: "from-emerald-400 via-green-500 to-cyan-500",
  },
  {
    title: "🧠 Inception",
    description: "Masuk ke dalam mimpi untuk mencuri atau menanam ide.",
    image: "/inception.jpg",
    color: "from-pink-400 via-fuchsia-500 to-purple-600",
  },
];

export default function MoviesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      id="projects"
      className="
        relative py-24 overflow-hidden

        bg-gradient-to-br
        from-[#f8fafc] via-[#ecfeff] to-[#f1f5f9]

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#020b1a]

        text-gray-900 dark:text-white
      "
    >
      {/* glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/20 blur-[150px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-blue-400/20 blur-[150px] bottom-[-200px] right-[-200px]" />
      </div>

      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold">
          🎬 Favorite Movies
        </h2>
        <p className="text-muted-foreground mt-2">
          Koleksi film cinematic dengan vibe modern neon
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">

            {movies.map((movie, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33%]"
              >
                <div className="
                  group p-4 rounded-2xl
                  bg-white/60 dark:bg-white/5
                  backdrop-blur-xl
                  border border-white/30 dark:border-white/10
                  hover:-translate-y-2 transition duration-500
                ">

                  {/* IMAGE */}
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${movie.color} blur-2xl opacity-40 group-hover:opacity-80 transition`}
                    />

                    <div
                      className={`relative rounded-xl p-[2px] bg-gradient-to-r ${movie.color}`}
                    >
                      <div className="overflow-hidden rounded-xl aspect-[2/3] bg-black">
                        <img
                          src={movie.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TEXT */}
                  <h3 className="mt-4 font-bold text-lg">
                    {movie.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    {movie.description}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* BUTTONS */}
        <Button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 dark:bg-white/10 backdrop-blur-md"
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 dark:bg-white/10 backdrop-blur-md"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}