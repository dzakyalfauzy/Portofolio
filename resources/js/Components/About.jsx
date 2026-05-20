import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Briefcase, Code2, Users, Coffee } from "lucide-react";
import "../../css/components/about.css";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

const stats = [
    { icon: Briefcase, value: "3+", label: "Years Exp." },
    { icon: Code2, value: "30+", label: "Projects" },
    { icon: Users, value: "15+", label: "Clients" },
    { icon: Coffee, value: "1k+", label: "Coffees" },
];

const highlights = [
    {
        title: "Front‑End Development",
        description:
            "Building responsive, accessible UIs with React, Next.js, and modern CSS frameworks.",
    },
    {
        title: "Back‑End Engineering",
        description:
            "Designing scalable APIs and services with Laravel, Node.js, and relational databases.",
    },
    {
        title: "UI / UX Design",
        description:
            "Creating intuitive user experiences with a focus on usability and visual polish.",
    },
];

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="about" ref={sectionRef} className="about">
            <div className="about__ambient" aria-hidden>
                <div className="about__ambient-glow" />
            </div>

            <div className="layout-shell">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="about__header"
                >
                    <span className="about__eyebrow">About Me</span>
                    <h2 className="about__title">
                        Passionate about crafting{" "}
                        <span className="about__title-accent">digital experiences</span>
                    </h2>
                </motion.div>

                <div className="about__grid">
                    <div className="about__col-visual">
                        <motion.div
                            variants={scaleIn(0.1)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="about__photo-wrap"
                        >
                            <div className="about__photo-glow" aria-hidden />
                            <div className="about__photo-card">
                                <div className="about__photo-inner-grad" aria-hidden />
                                <div className="about__photo-placeholder">
                                    <div className="about__photo-avatar">D</div>
                                    <p className="about__photo-hint">Your photo here</p>
                                </div>
                                <motion.div
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 3,
                                    }}
                                    className="about__shimmer"
                                    aria-hidden
                                />
                            </div>
                            <div className="about__dots" aria-hidden />
                        </motion.div>

                        <motion.div
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="about__stats"
                        >
                            {stats.map(({ icon: Icon, value, label }) => (
                                <motion.div key={label} whileHover={{ y: -3, scale: 1.03 }} className="about__stat">
                                    <Icon size={14} />
                                    <span className="about__stat-value">{value}</span>
                                    <span className="about__stat-label">{label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="about__col-text">
                        <motion.div
                            variants={fadeUp(0.15)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="about__bio"
                        >
                            <p className="about__bio-lead">
                                I&apos;m a full‑stack developer with over 3 years of experience building modern web
                                applications. I specialize in creating performant, accessible, and visually stunning
                                digital products that solve real‑world problems.
                            </p>
                            <p className="about__bio-muted">
                                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
                                open‑source, or sketching UI concepts. I believe great software is built at the
                                intersection of clean engineering and thoughtful design.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp(0.25)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="about__highlights"
                        >
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ y: -2, borderColor: "rgba(139,92,246,0.3)" }}
                                    className="about__highlight"
                                >
                                    <div className="about__highlight-inner">
                                        <span className="about__highlight-num">{i + 1}</span>
                                        <div className="about__highlight-body">
                                            <h3 className="about__highlight-title">{item.title}</h3>
                                            <p className="about__highlight-desc">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={fadeUp(0.35)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="about__cv-wrap"
                        >
                            <motion.a
                                href="/cv.pdf"
                                download
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 0 25px rgba(139,92,246,0.35)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="about__cv"
                            >
                                <Download size={18} />
                                <span>Download CV</span>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
