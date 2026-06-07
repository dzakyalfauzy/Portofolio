import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL = 191;
const PREFIX = "/sequence/ezgif-frame-";
const EXT = ".png";

export default function IntroSequence() {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrame = useRef(0);

    const [isReady, setIsReady] = useState(false);

    /* ── 1. Preload 191 frames ── */
    useEffect(() => {
        let loaded = 0;
        const imgs = [];

        for (let i = 0; i < TOTAL; i++) {
            const padded = String(i + 1).padStart(3, "0");
            const img = new Image();
            img.src = `${PREFIX}${padded}${EXT}`;

            img.onload = () => {
                loaded++;
                if (loaded === TOTAL) setIsReady(true);
            };

            img.onerror = () => {
                loaded++;
                if (loaded === TOTAL) setIsReady(true);
            };

            imgs[i] = img;
        }

        imagesRef.current = imgs;
    }, []);

    /* ── 2. Canvas DPR sizing ── */
    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
    };

    useEffect(() => {
        if (!isReady) return;
        updateCanvasSize();

        const img = imagesRef.current[0];
        if (img && img.complete) {
            const ctx = canvasRef.current.getContext("2d");
            drawCover(ctx, canvasRef.current, img);
            currentFrame.current = 0;
        }
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;

        const onResize = () => {
            updateCanvasSize();
            const img = imagesRef.current[currentFrame.current];
            if (img && img.complete) {
                const ctx = canvasRef.current.getContext("2d");
                drawCover(ctx, canvasRef.current, img);
            }
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [isReady]);

    /* ── 3. Scroll → frame rendering ── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        if (!isReady) return;

        const renderFrame = (progress) => {
            const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(progress * TOTAL)));
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const img = imagesRef.current[idx];

            if (ctx && img && img.complete) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                const imgRatio = img.width / img.height;
                const canvasRatio = canvas.width / canvas.height;
                let w, h, x, y;

                if (canvasRatio > imgRatio) {
                    w = canvas.width;
                    h = canvas.width / imgRatio;
                    x = 0;
                    y = (canvas.height - h) / 2;
                } else {
                    w = canvas.height * imgRatio;
                    h = canvas.height;
                    x = (canvas.width - w) / 2;
                    y = 0;
                }

                ctx.drawImage(img, x, y, w, h);
                currentFrame.current = idx;
            }
        };

        renderFrame(0);

        const unsub = scrollYProgress.on("change", (p) => {
            requestAnimationFrame(() => renderFrame(p));
        });

        return () => unsub();
    }, [scrollYProgress, isReady]);

    /* ── 4. Text exit (fade out at end of scroll) ── */
    const textExitOp = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);
    const textExitY = useTransform(scrollYProgress, [0.85, 0.95], [0, -40]);

    /* Scroll hint */
    const hintOp = useTransform(scrollYProgress, [0.92, 0.97], [0, 1]);
    const hintY = useTransform(scrollYProgress, [0.92, 0.97], [10, 0]);

    /* Bottom fire gradient */
    const fireGrad = useTransform(scrollYProgress, [0.88, 0.98], [0, 1]);

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                height: "400vh",
                backgroundColor: "#000",
                zIndex: 99, // Blokir Navbar bawaan awal
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: "#000"
                }}
            >
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    style={{
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                />

                {/* Text overlays */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                    }}
                >
                    {/* Cinematic vignette */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
                        }}
                    />

                    {/* Fire glow at bottom */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "30%",
                            background:
                                "radial-gradient(ellipse at 50% 100%, rgba(239,68,68,0.08) 0%, transparent 70%)",
                        }}
                    />

                    {/* ── Text Block — mount animation + scroll exit ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingBottom: "15vh",
                            padding: "2rem",
                            textAlign: "center",
                            opacity: textExitOp,
                            y: textExitY,
                        }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                                fontWeight: 800,
                                color: "rgba(255,255,255,0.85)",
                                letterSpacing: "0.05em",
                                lineHeight: 1.5,
                                maxWidth: "48rem",
                                margin: 0,
                                textTransform: "uppercase",
                                fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
                                textShadow: "0 0 10px rgba(239, 68, 68, 0.4), 0 0 25px rgba(249, 115, 22, 0.2)",
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
                                fontSize: "clamp(4rem, 12vw, 10rem)",
                                fontWeight: 900,
                                color: "#fff",
                                letterSpacing: "0.08em",
                                lineHeight: 0.9,
                                maxWidth: "56rem",
                                margin: "1.5rem 0 0 0",
                                textTransform: "uppercase",
                                fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
                                textShadow:
                                    "0 0 20px rgba(239, 68, 68, 0.7), 0 0 50px rgba(239, 68, 68, 0.4), 0 0 80px rgba(249, 115, 22, 0.25)",
                            }}
                        >
                            Welcome
                        </motion.p>

                        <motion.span
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                display: "block",
                                marginTop: "1.5rem",
                                width: "6rem",
                                height: "3px",
                                background: "linear-gradient(90deg, transparent, #EF4444, #F97316, transparent)",
                            }}
                        />
                    </motion.div>

                    {/* ── Scroll hint ── */}
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: "2.5rem",
                            left: 0,
                            right: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                            opacity: hintOp,
                            y: hintY,
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 600,
                                color: "rgba(239,68,68,0.6)",
                                letterSpacing: "0.35em",
                                textTransform: "uppercase",
                                margin: 0,
                                fontFamily: "'Bebas Neue', 'Oswald', 'Impact', sans-serif",
                                fontSize: "1rem",
                                textShadow: "0 0 12px rgba(239,68,68,0.3)",
                            }}
                        >
                            Descend Into The Abyss
                        </p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ChevronDown size={22} color="rgba(239,68,68,0.5)" />
                        </motion.div>
                    </motion.div>

                    {/* Bottom fire fade */}
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "35%",
                            background:
                                "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
                            opacity: fireGrad,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

/* ===== Cover-fit draw ===== */
function drawCover(ctx, canvas, img) {
    if (!img) return;
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let w, h, x, y;

    if (canvasRatio > imgRatio) {
        w = canvas.width;
        h = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - h) / 2;
    } else {
        w = canvas.height * imgRatio;
        h = canvas.height;
        x = (canvas.width - w) / 2;
        y = 0;
    }

    ctx.drawImage(img, x, y, w, h);
}