import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../utils/scroll";

const ICON = (icon) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`;

/* ===== Skills data — harmonized colors ===== */
const skillsData = [
    // Frontend
    { name: "React", label: "React", color: "#5aabbd", icon: "react/react-original", desc: "Frontend UI library", prof: 90 },
    { name: "Next.js", label: "Next", color: "#555555", icon: "nextjs/nextjs-original", desc: "React meta-framework", prof: 80 },
    { name: "Vue.js", label: "Vue", color: "#5a9e6f", icon: "vuejs/vuejs-original", desc: "Progressive framework", prof: 75 },
    { name: "HTML5", label: "HTML", color: "#c46a3c", icon: "html5/html5-original", desc: "Markup language", prof: 95 },
    { name: "CSS3", label: "CSS", color: "#3a7bbf", icon: "css3/css3-original", desc: "Styling language", prof: 90 },
    { name: "Tailwind", label: "Tailwind", color: "#4a9eab", icon: "tailwindcss/tailwindcss-original", desc: "Utility-first CSS", prof: 92 },
    { name: "JavaScript", label: "JS", color: "#a88a30", icon: "javascript/javascript-original", desc: "Core web language", prof: 92 },
    { name: "TypeScript", label: "TS", color: "#4a7ab5", icon: "typescript/typescript-original", desc: "Typed JavaScript", prof: 85 },
    // Backend
    { name: "Laravel", label: "Laravel", color: "#c43a31", icon: "laravel/laravel-original", desc: "PHP web framework", prof: 88 },
    { name: "PHP", label: "PHP", color: "#6b6fa3", icon: "php/php-original", desc: "Backend language", prof: 85 },
    { name: "Python", label: "Python", color: "#4a7a9e", icon: "python/python-original", desc: "General-purpose language", prof: 72 },
    { name: "Node.js", label: "Node", color: "#4a8a4a", icon: "nodejs/nodejs-original", desc: "Server-side JS runtime", prof: 82 },
    { name: "MySQL", label: "MySQL", color: "#3a6a8a", icon: "mysql/mysql-original", desc: "Relational database", prof: 85 },
    { name: "PostgreSQL", label: "Postgres", color: "#3a5a9e", icon: "postgresql/postgresql-original", desc: "Advanced SQL database", prof: 78 },
    // Tools
    { name: "Git", label: "Git", color: "#c44a32", icon: "git/git-original", desc: "Version control", prof: 90 },
    { name: "Docker", label: "Docker", color: "#3a7ac0", icon: "docker/docker-original", desc: "Container platform", prof: 75 },
    { name: "VS Code", label: "VSCode", color: "#3a8ac0", icon: "vscode/vscode-original", desc: "Code editor", prof: 95 },
    { name: "Postman", label: "Postman", color: "#c46a3c", icon: "postman/postman-original", desc: "API testing tool", prof: 80 },
    { name: "Nginx", label: "Nginx", color: "#3a7a3a", icon: "nginx/nginx-original", desc: "Web server", prof: 68 },
    // Design
    { name: "Figma", label: "Figma", color: "#a84a3a", icon: "figma/figma-original", desc: "UI design tool", prof: 70 },
    { name: "Adobe XD", label: "XD", color: "#4a3a7a", icon: "xd/xd-plain", desc: "Design & prototyping", prof: 65 },
];

/* ===== Keyboard row layout (standard keyboard-like) ===== */
const keySize = 54;
const keyGap = 5;
const rowGap = 5;

const keyboardRows = [
    skillsData.slice(0, 6),   // Row 0: React, Next, Vue, HTML, CSS, Tailwind
    skillsData.slice(6, 12),  // Row 1: JS, TS, Laravel, PHP, Python, Node
    skillsData.slice(12, 18), // Row 2: MySQL, Postgres, Git, Docker, VSCode, Postman
    skillsData.slice(18, 21), // Row 3: Nginx, Figma, XD
];

/* ===== Color helpers ===== */
function darken(hex, amt) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const n = parseInt(hex, 16);
    const r = Math.max(0, ((n >> 16) & 255) * (1 - amt));
    const g = Math.max(0, ((n >> 8) & 255) * (1 - amt));
    const b = Math.max(0, (n & 255) * (1 - amt));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

function isLight(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const n = parseInt(hex, 16);
    return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 160;
}

/* ===== 3D Keycap Component ===== */
function Keycap({ skill, index, onPopup }) {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [imgErr, setImgErr] = useState(false);

    const { name, label, color, icon, desc, prof } = skill;
    const sideColor = darken(color, 0.5);
    const bottomColor = darken(color, 0.65);
    const light = isLight(color);

    const depth = pressed ? 3 : hovered ? 14 : 10;
    const faceY = pressed ? 3 : hovered ? -8 : 0;
    const glow = hovered ? `0 0 24px ${color}55, 0 0 48px ${color}22` : "none";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", width: keySize, height: keySize + 14, cursor: "pointer" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => { setPressed(true); onPopup(skill); }}
            onMouseUp={() => setPressed(false)}
        >
            {/* Tooltip */}
            {hovered && (
                <div style={{
                    position: "absolute", bottom: "100%", left: "50%",
                    transform: "translateX(-50%)", marginBottom: 10,
                    padding: "5px 12px", borderRadius: 20,
                    backgroundColor: "#111", border: `1px solid ${color}44`,
                    color: "#fff", fontSize: 11, fontWeight: 600,
                    whiteSpace: "nowrap", letterSpacing: 0.5, pointerEvents: "none", zIndex: 100,
                }}>
                    {name}
                </div>
            )}

            {/* === 3D Bottom face (base) === */}
            <div style={{
                position: "absolute", bottom: 0, left: 0,
                width: keySize, height: depth,
                backgroundColor: bottomColor,
                borderRadius: "0 0 6px 6px",
                transition: "height 0.12s ease",
            }} />

            {/* === 3D Right side face === */}
            <div style={{
                position: "absolute", right: 0, top: (keySize - depth) + 4,
                width: 6, height: depth,
                backgroundColor: sideColor,
                borderRadius: "0 3px 3px 0",
                transition: "height 0.12s ease, top 0.12s ease",
            }} />

            {/* === 3D Left side face === */}
            <div style={{
                position: "absolute", left: 0, top: (keySize - depth) + 4,
                width: 3, height: depth,
                backgroundColor: sideColor,
                borderRadius: "3px 0 0 3px",
                opacity: 0.5,
                transition: "height 0.12s ease, top 0.12s ease",
            }} />

            {/* === Top face (keycap surface) === */}
            <motion.div
                animate={{ y: faceY }}
                transition={{ type: "spring", stiffness: 700, damping: 25, mass: 0.3 }}
                style={{
                    position: "absolute", top: 0, left: 0,
                    width: keySize, height: keySize,
                    borderRadius: 8,
                    backgroundColor: color,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 3,
                    zIndex: 2,
                    boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.35),
                        inset 0 -1px 2px rgba(0,0,0,0.15),
                        ${glow}
                    `,
                    filter: hovered ? "brightness(1.12)" : "none",
                    transition: "filter 0.12s ease, box-shadow 0.12s ease",
                    overflow: "hidden",
                }}
            >
                {/* Top highlight (plastic reflection) */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "42%",
                    borderRadius: "8px 8px 50% 50%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)",
                    pointerEvents: "none",
                }} />

                {/* Bottom shadow (inner depth) */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "20%",
                    borderRadius: "0 0 8px 8px",
                    background: "linear-gradient(0deg, rgba(0,0,0,0.12) 0%, transparent 100%)",
                    pointerEvents: "none",
                }} />

                {/* Icon */}
                {!imgErr ? (
                    <img
                        src={ICON(icon)} alt={name} draggable={false}
                        style={{
                            width: 26, height: 26, objectFit: "contain",
                            position: "relative", zIndex: 1,
                            filter: light ? "brightness(0.15) contrast(1.2)" : "none",
                        }}
                        onError={() => setImgErr(true)}
                    />
                ) : (
                    <div style={{
                        width: 26, height: 26, borderRadius: 6,
                        backgroundColor: "rgba(255,255,255,0.12)",
                        position: "relative", zIndex: 1,
                    }} />
                )}

                {/* Label */}
                <span style={{
                    fontSize: 7.5, fontWeight: 800,
                    color: light ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)",
                    textTransform: "uppercase", letterSpacing: 1.5, lineHeight: 1,
                    position: "relative", zIndex: 1,
                    fontFamily: "'Courier New', monospace",
                }}>
                    {label}
                </span>
            </motion.div>
        </motion.div>
    );
}

/* ===== Popup Detail Card ===== */
function PopupCard({ skill, onClose }) {
    if (!skill) return null;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "fixed", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)", zIndex: 1000,
                width: 300, backgroundColor: "#111118",
                border: `1px solid ${skill.color}55`, borderRadius: 16,
                padding: 24, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 14,
                boxShadow: `0 0 60px ${skill.color}22, 0 30px 80px rgba(0,0,0,0.6)`,
            }}
            onClick={onClose}
        >
            <div style={{
                width: 64, height: 64, borderRadius: 16,
                backgroundColor: skill.color, display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 30px ${skill.color}44`,
            }}>
                <img
                    src={ICON(skill.icon)} alt={skill.name} draggable={false}
                    style={{
                        width: 36, height: 36, objectFit: "contain",
                        filter: isLight(skill.color) ? "brightness(0.15)" : "none",
                    }}
                />
            </div>

            <div style={{ textAlign: "center" }}>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: 0.5 }}>{skill.name}</div>
                <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{skill.desc}</div>
            </div>

            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: "#555", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Proficiency</span>
                    <span style={{ color: skill.color, fontSize: 13, fontWeight: 700 }}>{skill.prof}%</span>
                </div>
                <div style={{
                    width: "100%", height: 5, borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden",
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.prof}%` }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            height: "100%", borderRadius: 3,
                            background: `linear-gradient(90deg, ${skill.color}, ${darken(skill.color, 0.3)})`,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

/* ===== Left: Typing Terminal ===== */
const codeSnippets = [
    "$ git commit -m 'feat: build keyboard UI'",
    "const skills = await loadSkills();",
    "app.use(cors(), helmet(), compression());",
    "docker compose up -d --build",
    "SELECT * FROM skills ORDER BY level DESC;",
    "npm run build && npm run preview",
];

function TypingTerminal() {
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const line = codeSnippets[lineIdx];
        if (charIdx < line.length) {
            const t = setTimeout(() => setCharIdx(c => c + 1), 35 + Math.random() * 25);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setCharIdx(0);
            setLineIdx((i) => (i + 1) % codeSnippets.length);
        }, 1800);
        return () => clearTimeout(t);
    }, [charIdx, lineIdx]);

    useEffect(() => {
        const t = setInterval(() => setShowCursor(c => !c), 530);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={{
            width: 260, backgroundColor: "#0d0d14", borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
            <div style={{
                display: "flex", gap: 5, padding: "10px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f87171" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#fbbf24" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#4ade80" }} />
            </div>
            <div style={{ padding: "14px 16px", minHeight: 120 }}>
                {codeSnippets.slice(0, 3).map((_, i) => {
                    const idx = (lineIdx + i) % codeSnippets.length;
                    const snippet = codeSnippets[idx];
                    const isActive = i === 0;
                    return (
                        <div key={`${idx}-${i}`} style={{
                            fontFamily: "'Courier New', monospace",
                            fontSize: 11, lineHeight: 1.8,
                            color: isActive ? "#c9a84c" : "rgba(255,255,255,0.15)",
                            whiteSpace: "nowrap", overflow: "hidden",
                        }}>
                            {isActive ? snippet.slice(0, charIdx) : snippet}
                            {isActive && (
                                <span style={{
                                    display: "inline-block", width: 6, height: 13,
                                    backgroundColor: showCursor ? "#c9a84c" : "transparent",
                                    marginLeft: 1, verticalAlign: "middle",
                                    transition: "background-color 0.1s",
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ===== Right: Category Stats ===== */
const categories = [
    { name: "Frontend", count: 8, color: "#5aabbd", icon: "⟨/⟩" },
    { name: "Backend", count: 6, color: "#4a8a4a", icon: "{ }" },
    { name: "Tools", count: 5, color: "#c44a32", icon: "⚙" },
    { name: "Design", count: 2, color: "#6b6fa3", icon: "◆" },
];

function CategoryStats() {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 200 }}>
            {categories.map((cat, i) => (
                <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                        padding: "12px 16px", borderRadius: 10,
                        backgroundColor: hoveredIdx === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${hoveredIdx === i ? cat.color + "33" : "rgba(255,255,255,0.04)"}`,
                        transition: "all 0.2s ease", cursor: "default",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14, color: cat.color, fontFamily: "monospace" }}>{cat.icon}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: 0.5 }}>{cat.name}</span>
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 800, color: cat.color, fontFamily: "'Courier New', monospace" }}>{cat.count}</span>
                    </div>
                    <div style={{
                        width: "100%", height: 3, borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden",
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(cat.count / 21) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.8 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                height: "100%", borderRadius: 2,
                                background: `linear-gradient(90deg, ${cat.color}88, ${cat.color})`,
                            }}
                        />
                    </div>
                </motion.div>
            ))}

            {/* Total badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    marginTop: 4, padding: "10px 16px", borderRadius: 10,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    textAlign: "center",
                }}
            >
                <span style={{ fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Total Skills</span>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#e8e8e8", fontFamily: "'Courier New', monospace", lineHeight: 1.2 }}>21</div>
            </motion.div>
        </div>
    );
}

/* ===== Main Component ===== */
export default function Skills() {
    const sectionRef = useRef(null);
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <section id="skills" ref={sectionRef} style={{
            position: "relative", minHeight: "100vh",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            backgroundColor: "#000", overflow: "hidden", padding: "4rem 0",
        }}>
            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 700, height: 500, borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(30,30,100,0.2) 0%, transparent 65%)",
                pointerEvents: "none",
            }} />

            <ScrollReveal>
                {/* Title */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <h2 style={{
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900,
                        color: "#ccc", fontFamily: "'Courier New', monospace",
                        letterSpacing: 12, textTransform: "uppercase", margin: 0,
                        textShadow: "0 2px 0 #999, 0 4px 0 #777, 0 6px 12px rgba(0,0,0,0.4)",
                    }}>
                        Skills
                    </h2>
                </div>

                {/* Keyboard + Side Panels */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "3rem" }}>
                    {/* Left: Typing Terminal */}
                    <div style={{ display: "none" }} className="skills-side-panel">
                        <TypingTerminal />
                    </div>
                    <style>{`@media (min-width: 1024px) { .skills-side-panel { display: block !important; } }`}</style>

                    <div style={{ perspective: 1200, perspectiveOrigin: "50% 35%" }}>
                        <div style={{
                            transform: "rotateX(18deg) rotateY(-3deg)",
                            transformStyle: "preserve-3d",
                            display: "inline-flex", flexDirection: "column",
                            alignItems: "center", gap: rowGap,
                            padding: "24px 28px",
                            backgroundColor: "#0a0a0f",
                            borderRadius: 16,
                            border: "1px solid rgba(255,255,255,0.04)",
                            boxShadow: "0 60px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02) inset",
                        }}>
                            {keyboardRows.map((row, rowIdx) => (
                                <div key={rowIdx} style={{
                                    display: "flex", gap: keyGap,
                                    paddingLeft: rowIdx * 8,
                                }}>
                                    {row.map((skill, keyIdx) => (
                                        <Keycap
                                            key={skill.name}
                                            skill={skill}
                                            index={rowIdx * 6 + keyIdx}
                                            onPopup={setActiveSkill}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Category Stats */}
                    <div style={{ display: "none" }} className="skills-side-panel">
                        <CategoryStats />
                    </div>
                </div>
            </ScrollReveal>

            {/* Popup */}
            <AnimatePresence>
                {activeSkill && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 999 }}
                            onClick={() => setActiveSkill(null)}
                        />
                        <PopupCard skill={activeSkill} onClose={() => setActiveSkill(null)} />
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
