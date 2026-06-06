import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, Server, Wrench, Palette, Webhook, PenTool, LayoutTemplate, Layers, Type, Pipette } from "lucide-react";
import { ScrollReveal } from "../utils/scroll";
import "../../css/components/skills.css";

/* ===== Infinite Tech Marquee ===== */
const marqueeItems = [
    "React", "Next.js", "Laravel", "Tailwind CSS", "TypeScript", "Node.js",
    "Figma", "Docker", "PostgreSQL", "Git", "Framer Motion", "Vite",
    "PHP", "MySQL", "Firebase", "Adobe XD", "Python", "JavaScript",
];

function TechMarquee() {
    /* Duplicate items for seamless loop */
    const items = useMemo(() => [...marqueeItems, ...marqueeItems], []);

    return (
        <ScrollReveal className="skills__marquee-wrap">
            <div className="skills__marquee">
                <div className="skills__marquee-track">
                    {items.map((name, i) => (
                        <span key={`${name}-${i}`} className="skills__marquee-item">
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </ScrollReveal>
    );
}

const skillIconSrc = (slug) => {
    const base = import.meta.env.BASE_URL ?? "/";
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    const path = `/skills/${slug}.svg`;
    return prefix && prefix !== "." ? `${prefix}${path}` : path;
};

const lucideIconMap = {
    Webhook, PenTool, LayoutTemplate, Layers, Type, Pipette,
};

function TechCell({ name, slug, lucide_icon, delay }) {
    const LucideIcon = lucide_icon ? lucideIconMap[lucide_icon] : null;

    return (
        <ScrollReveal className="skills__tech-cell" title={name}>
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
                ) : (
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.06)' }} />
                )}
            </div>
            <span className="skills__tech-name">{name}</span>
        </ScrollReveal>
    );
}

const staticCategories = [
    { title: "Frontend", icon: Monitor, color: "indigo" },
    { title: "Backend", icon: Server, color: "indigo" },
    { title: "Tools", icon: Wrench, color: "rose" },
    { title: "Design", icon: Palette, color: "rose" },
];

function SkillCard({ category, index }) {
    const Icon = category.icon;
    const mod = category.color;

    return (
        <ScrollReveal className={`skills__card skills__card--${mod}`}>
            <div className="skills__card-head skills__card-head--icons">
                <div className={`skills__badge skills__badge--${mod}`}>
                    <Icon size={18} />
                </div>
                <h3 className="skills__card-title">{category.title}</h3>
            </div>

            <div className="skills__tech-grid" role="list">
                {category.items.map((item, i) => (
                    <TechCell
                        key={item.id || item.name}
                        name={item.name}
                        slug={item.slug}
                        lucide_icon={item.lucide_icon}
                        delay={index + 2 + i}
                    />
                ))}
            </div>

            <div className={`skills__dot skills__dot--${mod}`} aria-hidden />
        </ScrollReveal>
    );
}

function SkillSkeleton({ mod }) {
    return (
        <div className={`skills__card skills__card--${mod}`} style={{ pointerEvents: 'none' }}>
            <div className="skills__card-head skills__card-head--icons">
                <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                <div className="skeleton" style={{ width: '80px', height: '20px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '16px' }}>
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="skeleton" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
                        <div className="skeleton" style={{ width: '60px', height: '14px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Skills({ items = [], loading = false }) {
    const sectionRef = useRef(null);

    const mappedCategories = staticCategories.map((cat) => ({
        ...cat,
        items: items.filter((item) => item.category?.toLowerCase() === cat.title.toLowerCase()),
    }));

    return (
        <section id="skills" ref={sectionRef} className="skills">
            <div className="layout-shell">
                <ScrollReveal className="skills__header">
                    <span className="skills__eyebrow">Skills & Tools</span>
                    <h2 className="skills__title">
                        Technologies I <span className="skills__title-accent">work with</span>
                    </h2>
                    <p className="skills__lead">
                        A carefully curated toolkit refined over years of building production applications.
                    </p>
                </ScrollReveal>

                <div className="skills__grid">
                    {loading ? (
                        <>
                            <SkillSkeleton mod="indigo" />
                            <SkillSkeleton mod="indigo" />
                            <SkillSkeleton mod="rose" />
                            <SkillSkeleton mod="rose" />
                        </>
                    ) : (
                        mappedCategories.map((cat, i) => (
                            <SkillCard key={cat.title} category={cat} index={i} />
                        ))
                    )}
                </div>

                <TechMarquee />
            </div>
        </section>
    );
}
