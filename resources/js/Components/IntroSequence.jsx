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

    const [isLoading, setIsLoading] = useState(true);
    const [pct, setPct] = useState(0);

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
                setPct(loaded / TOTAL);
                if (loaded === TOTAL) setIsLoading(false);
            };

            img.onerror = () => {
                loaded++;
                setPct(loaded / TOTAL);
                if (loaded === TOTAL) setIsLoading(false);
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
        if (isLoading) return;
        updateCanvasSize();

        const img = imagesRef.current[0];
        if (img && img.complete) {
            const ctx = canvasRef.current.getContext("2d");
            drawCover(ctx, canvasRef.current, img);
            currentFrame.current = 0;
        }
    }, [isLoading]);

    useEffect(() => {
        if (isLoading) return;

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
    }, [isLoading]);

    /* ── 3. Scroll → frame rendering ── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        if (isLoading) return;

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
    }, [scrollYProgress, isLoading]);

    /* ── 4. Text reveal (single block) ── */
    const textOp = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [60, 0, 0, -40]);
    const textScale = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0.9, 1, 1, 1.05]);
    const textSpacing = useTransform(scrollYProgress, [0.05, 0.15], ["0.3em", "0.05em"]);

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
                {/* Loading overlay */}
                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 100,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1.5rem",
                            backgroundColor: "#000",
                        }}
                    >
                        <div
                            style={{
                                width: "12rem",
                                height: "3px",
                                borderRadius: "2px",
                                backgroundColor: "rgba(239,68,68,0.15)",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    borderRadius: "2px",
                                    background: "linear-gradient(90deg, #ef4444, #f97316)",
                                    width: `${pct * 100}%`,
                                    transition: "width 0.15s ease",
                                }}
                            />
                        </div>
                        <span
                            style={{
                                color: "rgba(239,68,68,0.5)",
                                fontSize: "0.6875rem",
                                fontFamily: "ui-monospace, monospace",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                            }}
                        >
                            Loading {Math.round(pct * 100)}%
                        </span>
                    </div>
                )}

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

                    {/* ── Text Block (single reveal) ── */}
                    <motion.div
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
                            opacity: textOp,
                            y: textY,
                            scale: textScale,
                        }}
                    >
                        <motion.p
                            style={{
                                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                                fontWeight: 800,
                                color: "rgba(255,255,255,0.85)",
                                letterSpacing: textSpacing,
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

                        <span
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
                            gap: "0.625rem",
                            opacity: hintOp,
                            y: hintY,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.6875rem",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.45)",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                margin: 0,
                                textShadow: "0 0 8px rgba(239,68,68,0.2)",
                            }}
                        >
                            Scroll down
                        </p>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ChevronDown size={20} color="rgba(239,68,68,0.5)" />
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