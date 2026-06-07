import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../utils/scroll";
import "../../css/components/skills.css";

/* ===== Brand SVG Icons ===== */

const IconReact = () => (
    <svg viewBox="-11.5 -10.232 23 20.463" fill="none">
        <circle r="2.05" fill="#fff"/>
        <g stroke="#fff" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const IconJS = () => (
    <svg viewBox="0 0 32 32">
        <rect width="32" height="32" rx="3" fill="#F7DF1E"/>
        <text x="16" y="23" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="16" fill="#323330">JS</text>
    </svg>
);

const IconTS = () => (
    <svg viewBox="0 0 32 32">
        <rect width="32" height="32" rx="3" fill="#3178C6"/>
        <text x="16" y="23" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="16" fill="#fff">TS</text>
    </svg>
);

const IconNode = () => (
    <svg viewBox="0 0 32 32">
        <path d="M16 2L28.66 9.5V24.5L16 32L3.34 24.5V9.5L16 2Z" fill="#339933"/>
        <path d="M16 6L25.66 11.5V22.5L16 28L6.34 22.5V11.5L16 6Z" fill="#2D7D3A"/>
        <text x="16" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="11" fill="#fff">N</text>
    </svg>
);

const IconTailwind = () => (
    <svg viewBox="0 0 32 32">
        <path d="M16 6C11.2 6 8.4 8 7.5 12C9 10 10.8 8.7 12.9 8.1C14.3 7.7 15.7 8.1 16.7 9.1C18 10.4 18.3 12.4 17.3 14C15.5 16.8 12.5 17.5 10 18.5C7.5 19.5 6 21 6 24C8.8 24 10.5 22.7 11.7 21.3C13.2 19.5 14.3 18 17.5 17C20.3 16.1 22.5 14.5 23.3 11.5C24.3 7.5 21.8 6 16 6Z" fill="#fff"/>
        <path d="M16 10C20.8 10 23.6 12 24.5 16C23 14 21.2 12.7 19.1 12.1C17.7 11.7 16.3 12.1 15.3 13.1C14 14.4 13.7 16.4 14.7 18C16.5 20.8 19.5 21.5 22 22.5C24.5 23.5 26 25 26 28C23.2 28 21.5 26.7 20.3 25.3C18.8 23.5 17.7 22 14.5 21C11.7 20.1 9.5 18.5 8.7 15.5C7.7 11.5 10.2 10 16 10Z" fill="#06B6D4"/>
    </svg>
);

const IconGit = () => (
    <svg viewBox="0 0 32 32">
        <path d="M31.5 15.1L16.9 0.5C16.4 0 15.6 0 15.1 0.5L12.7 2.9L16.3 6.5C17 6.4 17.7 6.6 18.2 7.1C18.7 7.6 18.9 8.3 18.8 9L22.2 12.4C22.9 12.3 23.6 12.5 24.1 13C24.8 13.7 24.8 14.8 24.1 15.5C23.4 16.2 22.3 16.2 21.6 15.5C21.1 15 20.9 14.3 21 13.6L17.8 10.4V20.2L21 17.6C21.1 16.9 21.5 16.3 22.2 15.8C22.9 15.1 24 15.1 24.7 15.8C25.4 16.5 25.4 17.6 24.7 18.3C24.2 18.8 23.5 19 22.8 18.9L19.4 22.5C19.4 23.2 19.2 23.9 18.7 24.4C18 25.1 16.9 25.1 16.2 24.4C15.7 23.9 15.5 23.2 15.6 22.5L12.4 19.3V12.7L9.2 15.9C9.3 16.6 9.1 17.3 8.6 17.8C7.9 18.5 6.8 18.5 6.1 17.8C5.4 17.1 5.4 16 6.1 15.3C6.6 14.8 7.3 14.6 8 14.7L11.2 11.5V10.9L7.6 7.3C6.9 7.4 6.2 7.2 5.7 6.7C5.2 6.2 5 5.5 5.1 4.8L0.5 15.1C0 15.6 0 16.4 0.5 16.9L15.1 31.5C15.6 32 16.4 32 16.9 31.5L31.5 16.9C32 16.4 32 15.6 31.5 15.1Z" fill="#fff"/>
    </svg>
);

const IconLaravel = () => (
    <svg viewBox="0 0 32 32">
        <path d="M2 22.5L8 19V8.5L16 13.5V24L8 19.5V28L2 24.5V22.5Z" fill="#fff"/>
        <path d="M16 13.5L24 8.5V19L16 24V13.5Z" fill="#fff"/>
        <path d="M24 8.5L30 12V22.5L24 19V8.5Z" fill="#fff" opacity="0.7"/>
    </svg>
);

const IconPHP = () => (
    <svg viewBox="0 0 32 32">
        <ellipse cx="16" cy="16" rx="14" ry="10" fill="#fff"/>
        <text x="16" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="10" fill="#777BB4">PHP</text>
    </svg>
);

const IconFigma = () => (
    <svg viewBox="0 0 32 32">
        <rect x="6" y="2" width="9" height="12" rx="4.5" fill="#F24E1E"/>
        <rect x="17" y="2" width="9" height="12" rx="4.5" fill="#FF7262"/>
        <rect x="6" y="14" width="9" height="12" rx="4.5" fill="#A259FF"/>
        <circle cx="21.5" cy="10" r="4.5" fill="#1ABCFE"/>
        <rect x="6" y="2" width="9" height="12" rx="4.5" fill="#0ACF83"/>
    </svg>
);

const IconPostgres = () => (
    <svg viewBox="0 0 32 32">
        <ellipse cx="16" cy="10" rx="10" ry="5" fill="#fff"/>
        <path d="M6 10V22C6 24.8 10.5 27 16 27C21.5 27 26 24.8 26 22V10" fill="#4169E1"/>
        <ellipse cx="16" cy="10" rx="7" ry="3.5" fill="#fff" opacity="0.3"/>
        <text x="16" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="7" fill="#fff">PG</text>
    </svg>
);

const IconDocker = () => (
    <svg viewBox="0 0 32 32">
        <path d="M28.5 12.5C28 11.5 26.8 11 25.5 11H25V10C25 9.4 24.6 9 24 9H8C7.4 9 7 9.4 7 10V11H6.5C5.2 11 4 11.5 3.5 12.5C3 13.5 3.2 14.8 4 15.5C3.2 16 2.8 17 3 18C3.2 19 4 19.8 5 20C5.5 21.5 7 22.5 9 22.5C10.5 22.5 12 22 13 21.5L16 23L19 21.5C20 22 21.5 22.5 23 22.5C25 22.5 26.5 21.5 27 20C28 19.8 28.8 19 29 18C29.2 17 28.8 16 28 15.5C28.8 14.8 29 13.5 28.5 12.5Z" fill="#fff"/>
        <rect x="8" y="13" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="13" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
        <rect x="16" y="13" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="9.5" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
        <rect x="16" y="9.5" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
        <rect x="8" y="16.5" width="3" height="2.5" rx="0.5" fill="#2496ED" opacity="0.7"/>
        <rect x="12" y="16.5" width="3" height="2.5" rx="0.5" fill="#2496ED" opacity="0.7"/>
    </svg>
);

const IconNext = () => (
    <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="#fff"/>
        <path d="M12 10L22 24H18L8 10H12Z" fill="#000"/>
        <rect x="20" y="10" width="2" height="14" rx="1" fill="#000" opacity="0.6"/>
    </svg>
);

/* ===== Skills Data ===== */
const skills = [
    {
        id: "react", key: "r", label: "React", icon: IconReact,
        face: "#61DAFB", wall: "#4AB8DB",
        snippet: `const app = useReact({\n  expertise: "Advanced",\n  hooks: ["useState", "useEffect", "useMotionValue"],\n  components: ["Framer Motion", "React Router"],\n  render: () => <MagicExperience />\n});`,
    },
    {
        id: "js", key: "j", label: "JavaScript", icon: IconJS,
        face: "#F7DF1E", wall: "#D4BF0B",
        snippet: `const language = "JavaScript";\nconst features = [\n  "ES6+", "Async/Await", "Destructuring",\n  "Modules", "Promises", "Arrow Functions"\n];\nconsole.log(\`\${language} is life 🚀\`);`,
    },
    {
        id: "ts", key: "t", label: "TypeScript", icon: IconTS,
        face: "#3178C6", wall: "#2A66A7",
        snippet: `interface Developer {\n  name: string;\n  skills: string[];\n  level: "Senior" | "Staff";\n}\nconst me: Developer = {\n  name: "Dzaky", skills: ["TS", "React"], level: "Senior"\n};`,
    },
    {
        id: "node", key: "n", label: "Node.js", icon: IconNode,
        face: "#339933", wall: "#2B802B",
        snippet: `const server = express();\nserver.use(cors());\nserver.use(helmet());\n\nserver.get("/api/skills", (req, res) => {\n  res.json({ status: "🔥 on fire" });\n});\n\nserver.listen(3000);`,
    },
    {
        id: "tailwind", key: "w", label: "Tailwind", icon: IconTailwind,
        face: "#06B6D4", wall: "#059BAD",
        snippet: `<!-- Tailwind Magic -->\n<div className="flex items-center gap-4\n  bg-gradient-to-r from-indigo-500 to-rose-500\n  rounded-2xl p-8 shadow-2xl\n  hover:scale-105 transition-all">\n  <span className="text-white font-bold">✨</span>\n</div>`,
    },
    {
        id: "git", key: "g", label: "Git", icon: IconGit,
        face: "#F05032", wall: "#CF4429",
        snippet: `$ git log --oneline\n* a1b2c3d feat: add 3D keypad\n* d4e5f6g fix: scroll scrub smooth\n* h7i8j9k refactor: Cyber-Candy theme\n* k0l1m2n chore: clean up legacy CSS`,
    },
    {
        id: "laravel", key: "l", label: "Laravel", icon: IconLaravel,
        face: "#FF2D20", wall: "#DB261A",
        snippet: `Route::middleware('auth:sanctum')\n  ->group(function () {\n    Route::get('/projects', [ProjectController::class, 'index']);\n    Route::post('/upload', [UploadController::class, 'store']);\n  });\n\n// Elegant, isn't it? 🎩`,
    },
    {
        id: "php", key: "p", label: "PHP", icon: IconPHP,
        face: "#777BB4", wall: "#656A9C",
        snippet: `class Developer extends Human {\n  public string $name = "Dzaky";\n  public array $stack = ["PHP", "Laravel"];\n\n  public function build(): Project {\n    return new Project($this->stack);\n  }\n}`,
    },
    {
        id: "figma", key: "f", label: "Figma", icon: IconFigma,
        face: "#A259FF", wall: "#8B4ADB",
        snippet: `// Design → Code Pipeline\nconst design = figma.getFile("portfolio");\nconst tokens = extractDesignTokens(design);\nconst components = generateReact(tokens);\n\nexport { design, tokens, components };`,
    },
    {
        id: "postgres", key: "q", label: "PostgreSQL", icon: IconPostgres,
        face: "#4169E1", wall: "#3759C0",
        snippet: `SELECT s.name, s.level,\n  COUNT(p.id) as projects_built\nFROM skills s\nJOIN project_skills ps ON s.id = ps.skill_id\nJOIN projects p ON ps.project_id = p.id\nWHERE s.level >= 8\nORDER BY projects_built DESC;`,
    },
    {
        id: "docker", key: "d", label: "Docker", icon: IconDocker,
        face: "#2496ED", wall: "#1E80CC",
        snippet: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n# Shipping containers 📦`,
    },
    {
        id: "next", key: "x", label: "Next.js", icon: IconNext,
        face: "#000000", wall: "#1a1a1a",
        snippet: `// app/page.tsx — Server Component\nexport default async function Home() {\n  const data = await fetch("https://api.dev",\n    { next: { revalidate: 3600 } }\n  );\n  return <Hero data={data} />;\n}`,
    },
];

/* ===== Default terminal output ===== */
const defaultOutput = `// Welcome to my interactive skill pad! 🎹
// Click a keycap or press a key on your keyboard
// to see code snippets for each skill.

const portfolio = {
  developer: "Dzaky Al Fauzy",
  university: "Universitas Brawijaya",
  passion: "Building beautiful digital experiences",
  status: "Ready to collaborate ✨"
};`;

/* ===== Keycap Component ===== */
function Keycap({ skill, isActive, onPress }) {
    const Icon = skill.icon;

    return (
        <motion.button
            className={`skills__keycap ${isActive ? "skills__keycap--pressed" : ""}`}
            style={{
                "--key-face": skill.face,
                "--key-wall": skill.wall,
            }}
            animate={{
                z: isActive ? -8 : 0,
            }}
            transition={{ type: "spring", stiffness: 800, damping: 30, mass: 0.3 }}
            whileHover={{ z: -2 }}
            whileTap={{ z: -8 }}
            onClick={() => onPress(skill)}
        >
            <span className="skills__keycap-icon">
                <Icon />
            </span>
            <span className="skills__keycap-key">{skill.key.toUpperCase()}</span>
        </motion.button>
    );
}

/* ===== Typewriter Hook ===== */
function useTypewriter(text, speed = 18) {
    const [displayed, setDisplayed] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const timeoutRef = useRef(null);

    const start = useCallback((newText) => {
        setDisplayed("");
        setIsTyping(true);
        let i = 0;
        const type = () => {
            if (i < newText.length) {
                setDisplayed(newText.slice(0, i + 1));
                i++;
                timeoutRef.current = setTimeout(type, speed);
            } else {
                setIsTyping(false);
            }
        };
        type();
    }, [speed]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return { displayed, isTyping, start };
}

/* ===== Main Component ===== */
export default function Skills() {
    const [activeKey, setActiveKey] = useState(null);
    const [currentLabel, setCurrentLabel] = useState(null);
    const { displayed, isTyping, start: startTyping } = useTypewriter(14);

    const handleKeyPress = useCallback((skill) => {
        setActiveKey(skill.id);
        setCurrentLabel(skill.label);
        startTyping(skill.snippet);
        setTimeout(() => setActiveKey(null), 200);
    }, [startTyping]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
            const skill = skills.find((s) => s.key === e.key.toLowerCase());
            if (skill) {
                e.preventDefault();
                handleKeyPress(skill);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyPress]);

    return (
        <section id="skills" className="skills">
            <div className="layout-shell">
                <ScrollReveal className="skills__header">
                    <span className="skills__eyebrow">Skills & Tools</span>
                    <h2 className="skills__title">
                        Technologies I <span className="skills__title-accent">work with</span>
                    </h2>
                    <p className="skills__lead">
                        Click a keycap or press a key on your keyboard to see it in action.
                    </p>
                </ScrollReveal>

                <ScrollReveal className="skills__workspace">
                    {/* ===== LEFT: Terminal Panel ===== */}
                    <div className="skills__panel">
                        <div className="skills__panel-header">
                            <div className="skills__panel-dots">
                                <span className="skills__panel-dot skills__panel-dot--red" />
                                <span className="skills__panel-dot skills__panel-dot--yellow" />
                                <span className="skills__panel-dot skills__panel-dot--green" />
                            </div>
                            <span className="skills__panel-title">
                                {currentLabel ? `${currentLabel.toLowerCase()}.js` : "portfolio.js"}
                            </span>
                            {isTyping && <span className="skills__panel-cursor" />}
                        </div>

                        <div className="skills__panel-body">
                            <AnimatePresence mode="wait">
                                <motion.pre
                                    key={currentLabel || "default"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="skills__panel-code"
                                >
                                    <code>{displayed}</code>
                                </motion.pre>
                            </AnimatePresence>
                        </div>

                        <div className="skills__panel-footer">
                            <span className="skills__panel-hint">
                                💡 hint: press a key
                            </span>
                        </div>
                    </div>

                    {/* ===== RIGHT: Isometric Macropad ===== */}
                    <div className="skills__keypad-container">
                        <div className="skills__keypad">
                            <div className="skills__keypad-plate">
                                {skills.map((skill) => (
                                    <Keycap
                                        key={skill.id}
                                        skill={skill}
                                        isActive={activeKey === skill.id}
                                        onPress={handleKeyPress}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
