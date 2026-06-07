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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    /* ── 4. Text transforms ── */

    /* Welcome text: early in the sequence */
    const welcomeOp = useTransform(scrollYProgress, [0.03, 0.10, 0.18, 0.25], [0, 1, 1, 0]);
    const welcomeY = useTransform(scrollYProgress, [0.03, 0.10, 0.18, 0.25], [40, 0, 0, -30]);

    /* Tagline: mid sequence */
    const taglineOp = useTransform(scrollYProgress, [0.35, 0.42, 0.52, 0.58], [0, 1, 1, 0]);
    const taglineY = useTransform(scrollYProgress, [0.35, 0.42, 0.52, 0.58], [40, 0, 0, -30]);
    const taglineX = useTransform(scrollYProgress, [0.35, 0.42], [-50, 0]);

    /* Scroll down hint: appears at the end (last ~10% of scroll) */
    const scrollHintOp = useTransform(scrollYProgress, [0.88, 0.94, 0.99, 1.0], [0, 1, 1, 0.3]);
    const scrollHintY = useTransform(scrollYProgress, [0.88, 0.94], [20, 0]);

    /* Bottom gradient fade */
    const bottomGrad = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                height: "400vh",
                backgroundColor: "#000",
            }}
        >
            {/* Sticky viewport */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    width: "100%",
                    overflow: "hidden",
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
                                backgroundColor: "rgba(255,255,255,0.08)",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    borderRadius: "2px",
                                    background: "linear-gradient(135deg, #4f46e5, #f43f5e)",
                                    width: `${pct * 100}%`,
                                    transition: "width 0.15s ease",
                                }}
                            />
                        </div>
                        <span
                            style={{
                                color: "rgba(255,255,255,0.35)",
                                fontSize: "0.6875rem",
                                fontFamily: "ui-monospace, monospace",
                                letterSpacing: "0.15em",
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
                    {/* Subtle vignette */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.25) 100%)",
                        }}
                    />

                    {/* Welcome */}
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2rem",
                            textAlign: "center",
                            opacity: welcomeOp,
                            y: welcomeY,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.5)",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                margin: "0 0 1rem 0",
                            }}
                        >
                            Welcome
                        </p>
                        <h1
                            style={{
                                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                                fontWeight: 800,
                                color: "#fff",
                                letterSpacing: "-0.04em",
                                lineHeight: 1.05,
                                maxWidth: "60rem",
                                margin: 0,
                                textShadow: "0 4px 30px rgba(0,0,0,0.4)",
                            }}
                        >
                            to my{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                digital world
                            </span>
                        </h1>
                    </motion.div>

                    {/* Tagline */}
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            padding: "2rem clamp(2rem, 5vw, 5rem)",
                            opacity: taglineOp,
                            y: taglineY,
                            x: taglineX,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "clamp(1.25rem, 2.8vw, 2.25rem)",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.85)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.4,
                                maxWidth: "38rem",
                                margin: 0,
                                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                            }}
                        >
                            Crafting immersive experiences
                            <br />
                            through{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #818cf8, #f472b6)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: 700,
                                }}
                            >
                                code & design
                            </span>
                            .
                        </p>
                    </motion.div>

                    {/* Scroll down hint — appears at the end */}
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: "3rem",
                            left: 0,
                            right: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.75rem",
                            opacity: scrollHintOp,
                            y: scrollHintY,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.8125rem",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.6)",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                margin: 0,
                            }}
                        >
                            Scroll down to explore
                        </p>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ChevronDown size={24} color="rgba(255,255,255,0.5)" />
                        </motion.div>
                    </motion.div>

                    {/* Bottom fade */}
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "40%",
                            background: "linear-gradient(to bottom, transparent, #000)",
                            opacity: bottomGrad,
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
