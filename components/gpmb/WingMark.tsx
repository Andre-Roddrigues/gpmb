import { motion, useReducedMotion } from "motion/react";

const petals = [
  { d: "M183 22C149 51 142 104 174 190L205 286C218 218 217 147 202 79L193 28Z", fill: "var(--primary)" },
  { d: "M113 103C89 130 88 157 111 181L170 250C153 196 135 145 113 103Z", fill: "var(--primary)" },
  { d: "M45 174C39 206 53 230 84 244L151 274C115 237 80 204 45 174Z", fill: "var(--primary)" },
  { d: "M25 256C29 286 47 301 78 307L143 317C102 291 63 270 25 256Z", fill: "var(--green)" },
  { d: "M39 316C48 343 70 354 101 350L145 344C106 329 71 320 39 316Z", fill: "var(--green)" },
  { d: "M76 365C91 384 117 388 147 373L166 363C128 362 98 363 76 365Z", fill: "var(--green)" },
  { d: "M133 405C152 416 174 410 196 389C168 394 148 399 133 405Z", fill: "var(--orange)" },
  { d: "M183 429C202 435 219 425 232 405C211 414 195 422 183 429Z", fill: "var(--yellow)" },
  { d: "M226 449C242 451 254 440 263 421C248 432 236 441 226 449Z", fill: "var(--yellow)" }
];

export function WingMark({ label }: { label: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg aria-label={label} role="img" viewBox="0 0 290 480" className="h-auto w-full max-w-[25rem]" animate={reduced ? false : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      {petals.map((petal, index) => (
        <motion.path key={petal.d} {...petal} initial={reduced ? false : { opacity: 0, scale: .9, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: index * .07, duration: .55, ease: "easeOut" }} style={{ transformOrigin: "150px 340px" }} />
      ))}
    </motion.svg>
  );
}
