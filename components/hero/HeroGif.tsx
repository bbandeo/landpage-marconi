import { useEffect, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface HeroGifProps {
  scrollY: MotionValue<number>;
}

const floatingChips = [
  { label: "Preventa activa", value: "03 unidades" },
  { label: "Visitas guiadas", value: "Live 360º" },
];

export default function HeroGif({ scrollY }: HeroGifProps) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const visualY = useTransform(scrollY, [0, 500], [0, -60]);
  const visualScale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const rotateX = useTransform(smoothMouseY, [-20, 20], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-20, 20], [-4, 4]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX - innerWidth / 2) / innerWidth) * 20;
      const y = ((event.clientY - innerHeight / 2) / innerHeight) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="relative"
      style={{
        y: visualY,
        scale: visualScale,
        x: smoothMouseX,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 1.1,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
    >
      <div className="relative rounded-[32px] border border-white/10 bg-[#060b1b]/70 p-8 shadow-[0_40px_120px_rgba(3,4,13,0.9)] backdrop-blur-xl">
        <motion.div
          className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-orange-500/10 via-purple-500/5 to-transparent blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <NeonHouse />
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {floatingChips.map((chip) => (
            <motion.div
              key={chip.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                {chip.label}
              </p>
              <p className="text-lg font-semibold text-white">{chip.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-4 rounded-[28px] border border-orange-400/20"
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

function NeonHouse() {
  return (
    <motion.svg
      viewBox="0 0 420 320"
      className="mx-auto w-full max-w-[420px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="neonStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff914d" />
          <stop offset="100%" stopColor="#ffce6b" />
        </linearGradient>
        <linearGradient id="neonFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,145,77,0.15)" />
          <stop offset="100%" stopColor="rgba(255,145,77,0.05)" />
        </linearGradient>
      </defs>

      <motion.path
        d="M40 200 L210 70 L380 200 V300 H40 Z"
        fill="url(#neonFill)"
        stroke="url(#neonStroke)"
        strokeWidth="3"
        strokeLinejoin="round"
        animate={{ filter: ["drop-shadow(0 0 8px #ff914d)", "drop-shadow(0 0 15px #ff914d)", "drop-shadow(0 0 8px #ff914d)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.path
        d="M210 70 L210 35"
        stroke="url(#neonStroke)"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.rect
        x="170"
        y="190"
        width="60"
        height="95"
        stroke="url(#neonStroke)"
        strokeWidth="3"
        rx="8"
        fill="rgba(5,5,20,0.5)"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />

      <motion.rect
        x="250"
        y="190"
        width="80"
        height="55"
        stroke="url(#neonStroke)"
        strokeWidth="3"
        rx="8"
        fill="rgba(5,5,20,0.5)"
      />

      <motion.circle
        cx="330"
        cy="120"
        r="22"
        stroke="url(#neonStroke)"
        strokeWidth="3"
        fill="rgba(255,255,255,0.05)"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      <motion.path
        d="M320 130 L320 110 L325 120 L330 110 L330 130"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />

      {[60, 110, 160, 210, 260, 310].map((x) => (
        <motion.line
          key={x}
          x1={x}
          y1="220"
          x2={x + 20}
          y2="220"
          stroke="url(#neonStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: x / 120,
          }}
        />
      ))}
    </motion.svg>
  );
}
