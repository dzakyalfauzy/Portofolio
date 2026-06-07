import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../utils/scroll";
import "../../css/components/skills.css";

/* ===== Skill Keycaps Data ===== */
const skills = [
    {
        id: "react", key: "r", label: "React", color: "#61DAFB", textColor: "#000",
        snippet: `const app = useReact({\n  expertise: "Advanced",\n  hooks: ["useState", "useEffect", "useMotionValue"],\n  components: ["Framer Motion", "React Router"],\n  render: () => <MagicExperience />\n});`,
    },
    {
        id: "js", key: "j", label: "JS", color: "#F7DF1E", textColor: "#000",
        snippet: `const language = "JavaScript";\nconst features = [\n  "ES6+", "Async/Await", "Destructuring",\n  "Modules", "Promises", "Arrow Functions"\n];\nconsole.log(\`\${language} is life 🚀\`);`,
    },
    {
        id: "ts", key: "t", label: "TS", color: "#3178C6", textColor: "#fff",
        snippet: `interface Developer {\n  name: string;\n  skills: string[];\n  level: "Senior" | "Staff";\n}\nconst me: Developer = {\n  name: "Dzaky", skills: ["TS", "React"], level: "Senior"\n};`,
    },
    {
        id: "node", key: "n", label: "Node", color: "#339933", textColor: "#fff",
        snippet: `const server = express();\nserver.use(cors());\nserver.use(helmet());\n\nserver.get("/api/skills", (req, res) => {\n  res.json({ status: "🔥 on fire" });\n});\n\nserver.listen(3000);`,
    },
    {
        id: "tailwind", key: "w", label: "Tailwind", color: "#06B6D4", textColor: "#000",
        snippet: `<!-- Tailwind Magic -->\n<div className="flex items-center gap-4\n  bg-gradient-to-r from-indigo-500 to-rose-500\n  rounded-2xl p-8 shadow-2xl\n  hover:scale-105 transition-all">\n  <span className="text-white font-bold">✨</span>\n</div>`,
    },
    {
        id: "git", key: "g", label: "Git", color: "#F05032", textColor: "#fff",
        snippet: `$ git log --oneline\n* a1b2c3d feat: add 3D keypad\n* d4e5f6g fix: scroll scrub smooth\n* h7i8j9k refactor: Cyber-Candy theme\n* k0l1m2n chore: clean up legacy CSS`,
    },
    {
        id: "laravel", key: "l", label: "Laravel", color: "#FF2D20", textColor: "#fff",
        snippet: `Route::middleware('auth:sanctum')\n  ->group(function () {\n    Route::get('/projects', [ProjectController::class, 'index']);\n    Route::post('/upload', [UploadController::class, 'store']);\n  });\n\n// Elegant, isn't it? 🎩`,
    },
    {
        id: "php", key: "p", label: "PHP", color: "#777BB4", textColor: "#fff",
        snippet: `class Developer extends Human {\n  public string $name = "Dzaky";\n  public array $stack = ["PHP", "Laravel"];\n\n  public function build(): Project {\n    return new Project($this->stack);\n  }\n}`,
    },
    {
        id: "figma", key: "f", label: "Figma", color: "#F24E1E", textColor: "#fff",
        snippet: `// Design → Code Pipeline\nconst design = figma.getFile("portfolio");\nconst tokens = extractDesignTokens(design);\nconst components = generateReact(tokens);\n\nexport { design, tokens, components };`,
    },
    {
        id: "postgres", key: "q", label: "PostgreSQL", color: "#4169E1", textColor: "#fff",
        snippet: `SELECT s.name, s.level,\n  COUNT(p.id) as projects_built\nFROM skills s\nJOIN project_skills ps ON s.id = ps.skill_id\nJOIN projects p ON ps.project_id = p.id\nWHERE s.level >= 8\nORDER BY projects_built DESC;`,
    },
    {
        id: "docker", key: "d", label: "Docker", color: "#2496ED", textColor: "#fff",
        snippet: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n# Shipping containers 📦`,
    },
    {
        id: "next", key: "x", label: "Next.js", color: "#000000", textColor: "#fff",
        snippet: `// app/page.tsx — Server Component\nexport default async function Home() {\n  const data = await fetch("https://api.dev",\n    { next: { revalidate: 3600 } }\n  );\n  return <Hero data={data} />;\n}`,
    },
];

/* ===== Default hint message ===== */
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
    return (
        <motion.button
            className="skills__keycap"
            style={{
                "--key-color": skill.color,
                "--key-text": skill.textColor,
            }}
            animate={{
                y: isActive ? 6 : 0,
                boxShadow: isActive
                    ? `0 2px 0 0 ${skill.color}66, 0 1px 4px rgba(0,0,0,0.08)`
                    : `0 8px 0 0 ${skill.color}66, 0 12px 20px -4px rgba(0,0,0,0.12)`,
            }}
            transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.5 }}
            whileHover={{ y: 2 }}
            whileTap={{ y: 6 }}
            onClick={() => onPress(skill)}
        >
            <span className="skills__keycap-label">{skill.label}</span>
            <span className="skills__keycap-key">{skill.key.toUpperCase()}</span>
        </motion.button>
    );
}

/* ===== Typing Animation Hook ===== */
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
    const [currentSnippet, setCurrentSnippet] = useState(defaultOutput);
    const [currentLabel, setCurrentLabel] = useState(null);
    const { displayed, isTyping, start: startTyping } = useTypewriter(14);

    const handleKeyPress = useCallback((skill) => {
        setActiveKey(skill.id);
        setCurrentLabel(skill.label);
        startTyping(skill.snippet);

        /* Reset active state after animation */
        setTimeout(() => setActiveKey(null), 200);
    }, [startTyping]);

    /* Global keyboard listener */
    useEffect(() => {
        const handleKeyDown = (e) => {
            /* Ignore if user is typing in an input/textarea */
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
                    {/* ===== LEFT: Code Output Panel ===== */}
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

                    {/* ===== RIGHT: 3D Isometric Keypad ===== */}
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
