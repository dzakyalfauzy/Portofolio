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

const skillIconSrc = (slug) => {
    const base = import.meta.env.BASE_URL ?? "/";
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    const path = `/skills/${slug}.svg`;
    return prefix && prefix !== "." ? `${prefix}${path}` : path;
};

// Map Lucide icon string to component mapping
const lucideIconMap = {
    Webhook,
    PenTool,
    LayoutTemplate,
    Layers,
    Type,
    Pipette,
};

function TechCell({ name, slug, lucide_icon, delay, isInView }) {
    const LucideIcon = lucide_icon ? lucideIconMap[lucide_icon] : null;

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
                ) : (
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                )}
            </div>
            <span className="skills__tech-name">{name}</span>
        </motion.div>
    );
}

const staticCategories = [
    { title: "Frontend", icon: Monitor, color: "emerald" },
    { title: "Backend", icon: Server, color: "indigo" },
    { title: "Tools", icon: Wrench, color: "sky" },
    { title: "Design", icon: Palette, color: "rose" },
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
                        key={item.id || item.name}
                        name={item.name}
                        slug={item.slug}
                        lucide_icon={item.lucide_icon}
                        delay={baseDelay + i * 0.04}
                        isInView={isInView}
                    />
                ))}
            </div>

            <div className={`skills__dot skills__dot--${mod}`} aria-hidden />
        </motion.div>
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
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    // Group the flat list of dynamic items into static design-system cards
    const mappedCategories = staticCategories.map((cat) => ({
        ...cat,
        items: items.filter((item) => item.category?.toLowerCase() === cat.title.toLowerCase()),
    }));

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
                    {loading ? (
                        <>
                            <SkillSkeleton mod="emerald" />
                            <SkillSkeleton mod="indigo" />
                            <SkillSkeleton mod="sky" />
                            <SkillSkeleton mod="rose" />
                        </>
                    ) : (
                        mappedCategories.map((cat, i) => (
                            <SkillCard key={cat.title} category={cat} index={i} isInView={isInView} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
