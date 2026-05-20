import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Wrench, Palette, Webhook, PenTool, LayoutTemplate, Layers, Type, Pipette } from "lucide-react";
import "../../css/components/skills.css";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

/** Local brand icons (public/skills/{slug}.svg) — works offline */
const skillIconSrc = (slug) => {
    const base = import.meta.env.BASE_URL ?? "/";
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    const path = `/skills/${slug}.svg`;
    return prefix && prefix !== "." ? `${prefix}${path}` : path;
};

function TechCell({ name, slug, LucideIcon, delay, isInView }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
            className="skills__tech-cell"
            title={name}
        >
            <div className="skills__tech-icon-wrap">
                {slug ? (
                    <img
                        src={skillIconSrc(slug)}
                        alt=""
                        className="skills__tech-brand"
                        loading="lazy"
                        decoding="async"
                    />
                ) : LucideIcon ? (
                    <LucideIcon className="skills__tech-lucide" strokeWidth={1.35} aria-hidden />
                ) : null}
            </div>
            <span className="skills__tech-name">{name}</span>
        </motion.div>
    );
}

const categories = [
    {
        title: "Frontend",
        icon: Monitor,
        color: "violet",
        items: [
            { name: "React", slug: "react" },
            { name: "Tailwind", slug: "tailwindcss" },
            { name: "JavaScript", slug: "javascript" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "HTML", slug: "html5" },
            { name: "CSS", slug: "css3" },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        color: "indigo",
        items: [
            { name: "Laravel", slug: "laravel" },
            { name: "PHP", slug: "php" },
            { name: "MySQL", slug: "mysql" },
            { name: "Node.js", slug: "nodedotjs" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "REST APIs", LucideIcon: Webhook },
        ],
    },
    {
        title: "Tools",
        icon: Wrench,
        color: "sky",
        items: [
            { name: "Git", slug: "git" },
            { name: "Docker", slug: "docker" },
            { name: "VS Code", slug: "visualstudiocode" },
            { name: "Linux", slug: "linux" },
            { name: "Vite", slug: "vite" },
            { name: "Postman", slug: "postman" },
        ],
    },
    {
        title: "Design",
        icon: Palette,
        color: "rose",
        items: [
            { name: "Figma", slug: "figma" },
            { name: "UI / UX", LucideIcon: PenTool },
            { name: "Responsive", LucideIcon: LayoutTemplate },
            { name: "Prototyping", LucideIcon: Layers },
            { name: "Typography", LucideIcon: Type },
            { name: "Color", LucideIcon: Pipette },
        ],
    },
];

function SkillCard({ category, index, isInView }) {
    const Icon = category.icon;
    const mod = category.color;
    const baseDelay = index * 0.08 + 0.15;

    return (
        <motion.div
            variants={fadeUp(index * 0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -4 }}
            className={`skills__card skills__card--${mod}`}
        >
            <div className={`skills__card-glow skills__card-glow--${mod}`} aria-hidden />

            <div className="skills__card-head skills__card-head--icons">
                <div className={`skills__badge skills__badge--${mod}`}>
                    <Icon size={18} />
                </div>
                <h3 className="skills__card-title">{category.title}</h3>
            </div>

            <div className="skills__tech-grid" role="list">
                {category.items.map((item, i) => (
                    <TechCell
                        key={item.name}
                        name={item.name}
                        slug={item.slug}
                        LucideIcon={item.LucideIcon}
                        delay={baseDelay + i * 0.04}
                        isInView={isInView}
                    />
                ))}
            </div>

            <div className={`skills__dot skills__dot--${mod}`} aria-hidden />
        </motion.div>
    );
}

export default function Skills() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="skills" ref={sectionRef} className="skills">
            <div className="skills__ambient" aria-hidden>
                <div className="skills__glow-tr" />
                <div className="skills__glow-bl" />
            </div>

            <div className="layout-shell">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="skills__header"
                >
                    <span className="skills__eyebrow">Skills & Tools</span>
                    <h2 className="skills__title">
                        Technologies I <span className="skills__title-accent">work with</span>
                    </h2>
                    <p className="skills__lead">
                        A carefully curated toolkit refined over years of building production applications.
                    </p>
                </motion.div>

                <div className="skills__grid">
                    {categories.map((cat, i) => (
                        <SkillCard key={cat.title} category={cat} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
