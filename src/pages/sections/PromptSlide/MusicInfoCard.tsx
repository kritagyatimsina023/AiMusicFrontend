import { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MusicInfoCardProps {
  onClose: () => void;
}
const instrumentFamilies = [
  {
    title: "Piano",
    range: "0 - 7",
    desc: "Best for melody, soft emotional chords, cinematic intros, and calm harmonic structure.",
  },
  {
    title: "Mallet / Percussion",
    range: "8 - 15",
    desc: "Useful for bright textures, rhythmic accents, and playful musical vibes.",
  },
  {
    title: "Organ",
    range: "16 - 23",
    desc: "Creates rich, sustained background layers and emotional depth.",
  },
  {
    title: "Guitar",
    range: "24 - 31",
    desc: "Excellent for acoustic, pop, emotional, and warm expressive music generation.",
  },
  {
    title: "Bass",
    range: "32 - 39",
    desc: "Adds groove, rhythm support, and fullness to the generated music.",
  },
  {
    title: "Strings",
    range: "40 - 47",
    desc: "Very effective for emotional, cinematic, dramatic, and orchestral output.",
  },
  {
    title: "Ensemble / Choir",
    range: "48 - 55",
    desc: "Good for ambient, dreamy, and emotional backing layers.",
  },
  {
    title: "Brass",
    range: "56 - 63",
    desc: "Works well for powerful, energetic, heroic, and punchy music sections.",
  },
  {
    title: "Reed",
    range: "64 - 71",
    desc: "Adds expressive woodwind-like personality and melodic color.",
  },
  {
    title: "Pipe",
    range: "72 - 79",
    desc: "Useful for flute-like, airy, and emotional melodic output.",
  },
  {
    title: "Synth Lead",
    range: "80 - 87",
    desc: "Strong for electronic melody lines, hooks, and catchy lead parts.",
  },
  {
    title: "Synth Pad",
    range: "88 - 95",
    desc: "Great for atmospheric, dreamy, emotional, and ambient sound layers.",
  },
  {
    title: "Synth FX",
    range: "96 - 103",
    desc: "Adds futuristic texture, transitions, and experimental sound design.",
  },
  {
    title: "Ethnic",
    range: "104 - 111",
    desc: "Useful for culturally flavored and unique tonal outputs.",
  },
  {
    title: "Percussive",
    range: "112 - 119",
    desc: "Enhances rhythm structure and groove-heavy music generation.",
  },
  {
    title: "SFX",
    range: "120 - 127",
    desc: "Best for special effects, transitions, and experimental sounds.",
  },
];

const MusicInfoCard = ({ onClose }: MusicInfoCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        y: -200,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  }, []);

  const handleNavigateToFeatured = () => {
    onClose();
    navigate("/#featured-instruments");
    setTimeout(() => {
      const section = document.getElementById("featured-instruments");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-16 px-4">
      <div
        ref={cardRef}
        className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-black/90 p-8 text-white shadow-[0_0_100px_10px_rgba(233,155,99,0.15)]"
      >
        <img
          src="/photos/gradient.png"
          className="absolute top-0 right-0 opacity-40 pointer-events-none"
          alt=""
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <RxCross1 className="text-white text-lg" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white/90">
            🎼 Recommended Instrument Families
          </h1>
          <p className="text-white/60 mt-3 max-w-3xl">
            These are the General MIDI instrument families that usually produce
            the best results in your music generation pipeline. Some are better
            for emotional melody, some for cinematic texture, and some for beat
            structure.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {instrumentFamilies.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-white/90">
                  {item.title}
                </h2>
                <span className="text-sm px-3 py-1 rounded-full bg-orange-500/20 text-orange-300">
                  {item.range}
                </span>
              </div>

              <p className="text-sm text-white/65 leading-6">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 rounded-2xl border border-orange-400/20 bg-orange-500/10 p-4">
          <p className="text-sm text-orange-100/90 leading-6">
            <span className="font-semibold">Tip:</span> For emotionally rich
            results, your best families are usually{" "}
            <span className="text-orange-300 font-semibold">
              Piano, Guitar, Strings, Choir, Pipe, and Synth Pad
            </span>
            . For energetic outputs,{" "}
            <span className="text-orange-300 font-semibold">
              Brass, Bass, Percussive, and Synth Lead
            </span>{" "}
            often work better.
          </p>

          <Button
            onClick={handleNavigateToFeatured}
            className="mt-4 border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-xl px-6 py-5 transition-all duration-300"
          >
            View Featured Instruments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicInfoCard;
