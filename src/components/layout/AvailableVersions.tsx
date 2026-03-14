"use client";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSignInStore } from "@/store/useSignInStore";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

gsap.registerPlugin(ScrollTrigger);

const versions = [
  {
    id: 1,
    tag: "ARIA · v1.0",
    name: "Aria Lite",
    badge: "Starter",
    badgeColor: "#e99b63",
    description:
      "Your first step into AI-powered music creation. Aria Lite understands your mood, tempo preferences, and genre taste to compose short melodic pieces. Perfect for hobbyists, students, and curious creators who want to explore the intersection of emotion and sound — no musical background required.",
    features: [
      "Mood-to-melody mapping",
      "8 core genres",
      "30s–2min outputs",
      "Basic mixing controls",
    ],
    glow: "#e99b63",
    border: "border-[#e99b63]/20",
    btnGradient: "from-[#e99b63] to-[#c97a3e]",
    tagColor: "text-[#e99b63]",
    tryId: "aria-lite",
  },
  {
    id: 2,
    tag: "ARIA · v2.0",
    name: "Aria Pro",
    badge: "Most Popular",
    badgeColor: "#a78bfa",
    description:
      "A full-spectrum compositional engine trained on 4 million tracks across 60 genres. Aria Pro generates layered, production-ready music with dynamic arrangement, real-time parameter control, and stem export. Built for independent artists, content creators, and sound designers who demand nuance and depth.",
    features: [
      "Multi-track layering",
      "60+ genres & subgenres",
      "Stem export (WAV/FLAC)",
      "Real-time tempo & key control",
    ],
    glow: "#a78bfa",
    border: "border-[#a78bfa]/20",
    btnGradient: "from-[#a78bfa] to-[#7c3aed]",
    tagColor: "text-[#a78bfa]",
    tryId: "aria-pro",
  },
  {
    id: 3,
    tag: "ARIA · v3.0",
    name: "Aria Ultra",
    badge: "Enterprise",
    badgeColor: "#34d399",
    description:
      "The pinnacle of generative audio intelligence. Aria Ultra fuses lyrical composition, orchestral arrangement, and adaptive sound design into one unified model. With API access, custom model fine-tuning, and full commercial licensing, Ultra is the backbone for studios, game developers, and music tech platforms.",
    features: [
      "Lyric & vocal synthesis",
      "Orchestral & cinematic scoring",
      "API + fine-tuning access",
      "Full commercial license",
    ],
    glow: "#34d399",
    border: "border-[#34d399]/20",
    btnGradient: "from-[#34d399] to-[#059669]",
    tagColor: "text-[#34d399]",
    tryId: "aria-ultra",
  },
];

const AvailableVersions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const { setOpen, setActivate } = useSignInStore();
  const { user } = useAuthStore();
  console.log("Available version user", user);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    if (user) {
      navigate(`/try-now/${Cookies.get("userId")}`);
      return;
    }
    setOpen(true);
    setActivate(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] min-h-screen py-28 px-6 overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Spotify-style font: Plus Jakarta Sans */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');

        .version-card {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
        }
        .version-card:hover {
          transform: translateY(-8px);
        }
        .try-btn {
          position: relative;
          overflow: hidden;
          transition: letter-spacing 0.25s ease, opacity 0.2s;
        }
        .try-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .try-btn:hover::after { opacity: 1; }
        .try-btn:hover { letter-spacing: 0.1em; }

        .badge-pill {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .feature-item::before {
          content: '—';
          margin-right: 8px;
          opacity: 0.4;
        }
      `}</style>

      {/* Ambient glows */}
      <div className="h-0 w-[40rem] absolute top-[10%] left-[-10%] shadow-[0_0_900px_10px_#e99b63] -rotate-[30deg] pointer-events-none" />
      <div className="h-0 w-[40rem] absolute top-[50%] right-[-5%] shadow-[0_0_900px_10px_#a78bfa] rotate-[25deg] pointer-events-none" />
      <div className="h-0 w-[30rem] absolute bottom-[5%] left-[30%] shadow-[0_0_700px_8px_#34d399] rotate-[10deg] pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Section heading */}
      <div ref={headingRef} className="text-center mb-20 relative z-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4 text-white/30"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          Powered by Aria Engine
        </p>
        <h2
          className="text-6xl md:text-8xl text-white leading-[1.0] mb-6"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          Available{" "}
          <span
            style={{
              fontWeight: 300,
              fontStyle: "italic",
              background:
                "linear-gradient(135deg, #e99b63 0%, #a78bfa 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Versions
          </span>
        </h2>
        <p
          className="text-white/40 max-w-xl mx-auto leading-relaxed"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
          }}
        >
          Three distinct intelligences, each tuned for a different creative
          frequency. Choose the one that resonates with your vision.
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {versions.map((v, i) => (
          <div
            key={v.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className={`version-card relative rounded-2xl border ${v.border} bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col`}
            style={{
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            {/* Top glow accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${v.glow}60, transparent)`,
              }}
            />

            {/* Badge */}
            <div className="flex items-center justify-between mb-6">
              <span
                className="badge-pill px-3 py-1 rounded-full border"
                style={{
                  color: v.badgeColor,
                  borderColor: `${v.badgeColor}40`,
                  background: `${v.badgeColor}10`,
                }}
              >
                {v.badge}
              </span>
              <span
                className={`${v.tagColor} opacity-60`}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {v.tag}
              </span>
            </div>

            {/* Name */}
            <h3
              className="text-4xl text-white mb-4"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {v.name}
            </h3>

            {/* Divider */}
            <div
              className="h-px w-12 mb-5 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${v.glow}, transparent)`,
              }}
            />

            {/* Description */}
            <p
              className="text-white/45 text-sm leading-relaxed mb-8 flex-1"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              {v.description}
            </p>

            {/* Features */}
            <ul className="mb-8 space-y-2">
              {v.features.map((f, fi) => (
                <li
                  key={fi}
                  className="feature-item text-white/50 flex items-center"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                  }}
                >
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={handleExplore}
              // to={`/try-now/${v.tryId}`}
              className={`try-btn cursor-pointer w-full py-3.5 rounded-xl text-white bg-gradient-to-r ${v.btnGradient} text-center block`}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Try Now →
            </button>
          </div>
        ))}
      </div>

      {/* Bottom decorative line */}
      <div className="relative z-10 mt-24 flex justify-center">
        <div
          className="h-px w-40 rounded-full opacity-20"
          style={{
            background:
              "linear-gradient(90deg, transparent, #e99b63, #a78bfa, #34d399, transparent)",
          }}
        />
      </div>
    </section>
  );
};

export default AvailableVersions;
