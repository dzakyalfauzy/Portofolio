import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL = 191;
const PREFIX = "/sequence/ezgif-frame-";
const EXT = ".png";

/* ===== Cover-fit draw ===== */
function drawCover(ctx, canvas, img) {
    if (!img) return;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;
    let w, h, x, y;
    if (canvasRatio > imgRatio) {
        w = canvas.width; h = canvas.width / imgRatio; x = 0; y = (canvas.height - h) / 2;
    } else {
        w = canvas.height * imgRatio; h = canvas.height; x = (canvas.width - w) / 2; y = 0;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
}

/**
 * IntroSequence — scroll-driven canvas + Hero slide-up
 *
 * Architecture:
 *   ┌──────────────────────────┐ ← scroll track (500vh)
 *   │  sticky viewport (100vh) │ ← pinned during scroll
 *   │  ┌──────────────────┐    │
 *   │  │ Canvas (z:1)     │    │ ← image sequence frames
 *   │  │ Text overlays    │    │ ← animated text
 *   │  └──────────────────┘    │
 *   └──────────────────────────┘
 *   ↓ scroll continues ↓
 *   ┌──────────────────────────┐
 *   │ Hero (z:10, fixed)       │ ← slides up from y:100vh
 *   │ (children prop)          │    covers canvas at phase 3
 *   └──────────────────────────┘
 */
export default function IntroSequence() {
    const masterRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const lastFrameRef = useRef(-1);
    const rafRef = useRef(null);

    const [isReady, setIsReady] = useState(false);

    /* ── 1. Preload all frames ── */
    useEffect(() => {
        let loaded = 0;
        const imgs = [];
        for (let i = 0; i < TOTAL; i++) {
            const padded = String(i + 1).padStart(3, "0");
            const img = new Image();
            img.src = `${PREFIX}${padded}${EXT}`;
            img.onload = img.onerror = () => {
                loaded++;
                if (loaded === TOTAL) setIsReady(true);
            };
            imgs[i] = img;
        }
        imagesRef.current = imgs;
    }, []);

    /* ── 2. Canvas DPR + resize ── */
    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
    }, []);

    useEffect(() => {
        if (!isReady) return;
        updateCanvasSize();
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) drawCover(ctx, canvasRef.current, imagesRef.current[0]);
        lastFrameRef.current = 0;

        const onResize = () => {
            updateCanvasSize();
            const idx = lastFrameRef.current;
            if (idx >= 0) {
                const ctx = canvasRef.current?.getContext("2d");
                if (ctx) drawCover(ctx, canvasRef.current, imagesRef.current[idx]);
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [isReady, updateCanvasSize]);

    /* ── 3. Scroll timeline ── */
    const { scrollYProgress } = useScroll({
        target: masterRef,
        offset: ["start start", "end end"],
    });

    /* Phase 1 (0–78%): image sequence 0→191 */
    const frameIndex = useTransform(scrollYProgress, [0, 0.78], [0, TOTAL - 1]);

    /* Phase 3 (82–100%): canvas fades to black */
    const fadeOut = useTransform(scrollYProgress, [0.88, 1.0], [1, 0]);

    /* Render frame to canvas on scroll */
    useEffect(() => {
        if (!isReady) return;
        const unsub = frameIndex.on("change", (val) => {
            const idx = Math.round(Math.max(0, Math.min(TOTAL - 1, val)));
            if (idx === lastFrameRef.current) return;
            lastFrameRef.current = idx;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");
                const img = imagesRef.current[idx];
                if (canvas && ctx && img) drawCover(ctx, canvas, img);
            });
        });
        return () => { unsub(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [isReady, frameIndex]);

    /* ── 4. Text transforms ── */
    const textOp = useTransform(scrollYProgress, [0.05, 0.12, 0.60, 0.72], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.05, 0.12, 0.60, 0.72], [60, 0, 0, -40]);
    const hintOp = useTransform(scrollYProgress, [0.85, 0.92], [0, 1]);
    const hintY = useTransform(scrollYProgress, [0.85, 0.92], [10, 0]);

    return (
        <>
            {/* ─── SCROLL TRACK ─── */}
            <div
                ref={masterRef}
                style={{ position: "relative", height: "500vh", backgroundColor: "#000" }}
            >
                {/* Pinned viewport — stays locked while scrolling */}
                <div
                    style={{
                        position: "sticky", top: 0,
                        height: "100vh", width: "100%",
                        overflow: "hidden", backgroundColor: "#000",
                    }}
                >
                    {/* Canvas */}
                    <canvas
                        ref={canvasRef}
                        style={{
                            display: "block", position: "absolute",
                            top: 0, left: 0, width: "100%", height: "100%", zIndex: 1,
                        }}
                    />

                    {/* Text overlays */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
                        }} />

                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "absolute", inset: 0,
                                display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "flex-end",
                                paddingBottom: "15vh", padding: "2rem", textAlign: "center",
                                opacity: textOp, y: textY,
                            }}
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    fontSize: "clamp(1.25rem, 2.5vw, 2rem)", fontWeight: 800,
                                    color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em",
                                    lineHeight: 1.5, maxWidth: "48rem", margin: 0, textTransform: "uppercase",
                                    fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
                                    textShadow: "0 0 10px rgba(239,68,68,0.4), 0 0 25px rgba(249,115,22,0.2)",
                                }}
                            >
                                <span style={{ color: "#EF4444" }}>Chaos</span> is tamed, and{" "}
                                <span style={{ color: "#F97316" }}>ideas</span> are forged.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 50, scale: 0.85 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    fontSize: "clamp(4rem, 12vw, 10rem)", fontWeight: 900,
                                    color: "#fff", letterSpacing: "0.08em", lineHeight: 0.9,
                                    maxWidth: "56rem", margin: "1.5rem 0 0 0", textTransform: "uppercase",
                                    fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
                                    textShadow: "0 0 20px rgba(239,68,68,0.7), 0 0 50px rgba(239,68,68,0.4), 0 0 80px rgba(249,115,22,0.25)",
                                }}
                            >
                                Welcome
                            </motion.p>

                            <motion.span
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: "block", marginTop: "1.5rem", width: "6rem", height: "3px",
                                    background: "linear-gradient(90deg, transparent, #EF4444, #F97316, transparent)",
                                }}
                            />
                        </motion.div>

                        {/* Scroll hint */}
                        <motion.div
                            style={{
                                position: "absolute", bottom: "2.5rem", left: 0, right: 0,
                                display: "flex", flexDirection: "column",
                                alignItems: "center", gap: "1rem",
                                opacity: hintOp, y: hintY,
                            }}
                        >
                            <p style={{
                                fontWeight: 600, color: "rgba(239,68,68,0.6)",
                                letterSpacing: "0.35em", textTransform: "uppercase",
                                margin: 0, fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
                                fontSize: "1rem",
                                textShadow: "0 0 12px rgba(239,68,68,0.3)",
                            }}>
                                Descend Into The Abyss
                            </p>
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                                <ChevronDown size={22} color="rgba(239,68,68,0.5)" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </>
    );
}
