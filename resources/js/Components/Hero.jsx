import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Github, Linkedin, Instagram } from "./Icons";
import "../../css/components/hero.css";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.9, ease: "easeOut" },
    },
};

const publicAsset = (path) => {
    const base = import.meta.env.BASE_URL ?? "/";
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    return prefix ? `${prefix}${path}` : path;
};

const PROFILE_PHOTO = "/images/Foto_Profile.png";

const socials = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export default function Hero() {
    return (
        <section id="home" className="hero">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="layout-shell hero__inner"
            >
                <div className="hero__content">

                    <motion.h1 variants={fadeUp} className="hero__title">
                        Hi, I&apos;m{" "}
                        <span className="hero__name-wrap">
                            <span className="hero__name">Dzaky Al Fauzy</span>
                            <span className="hero__name-line" aria-hidden />
                        </span>
                        <br />
                        <span className="hero__role-strong">Full‑Stack</span>{" "}
                        <span className="hero__role-muted">Developer</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="hero__sub">
                        I craft high performance digital experiences from elegant interfaces to robust back‑end
                        systems. Focused on clean code, delightful UX, and products that scale.
                    </motion.p>

                    <motion.div variants={fadeUp} className="hero__ctas">
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 0 30px rgba(139,92,246,0.45)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="hero__cta-primary"
                        >
                            <span>View Projects</span>
                            <ArrowRight size={18} className="hero__cta-arrow" />
                        </motion.a>

                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="hero__cta-secondary"
                        >
                            <Mail size={17} />
                            <span>Contact Me</span>
                        </motion.a>
                    </motion.div>

                    <motion.div variants={fadeUp} className="hero__social-wrap">
                        <span className="hero__social-heading">Find me on</span>
                        <div className="hero__social-row">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.08, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="hero__social-link"
                                >
                                    <Icon size={17} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={fadeIn} className="hero__visual">
                    <div className="hero__portrait-wrap">
                        <div className="hero__portrait-glow" aria-hidden />
                        <motion.div
                            whileHover={{ scale: 1.012 }}
                            transition={{ type: "spring", stiffness: 280, damping: 24 }}
                            className="hero__portrait"
                        >
                            <img
                                src={publicAsset(PROFILE_PHOTO)}
                                alt="Dzaky Al Fauzy"
                                className="hero__portrait-img"
                                width={520}
                                height={680}
                                loading="eager"
                                decoding="async"
                            />
                        </motion.div>
                        <div className="hero__portrait-overlay">
                            <div className="hero__portrait-meta">
                                <p className="hero__card-name">Dzaky Al Fauzy</p>
                                <p className="hero__card-role">Full‑Stack Developer</p>
                            </div>
                            <div className="hero__stats hero__stats--overlay">
                                {[
                                    { label: "Projects", value: "30+" },
                                    { label: "Clients", value: "15+" },
                                    { label: "Years", value: "3+" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="hero__stat">
                                        <span className="hero__stat-value">{value}</span>
                                        <span className="hero__stat-label">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="hero__scroll"
            >
                <span className="hero__scroll-text">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="hero__scroll-line"
                />
            </motion.div>
        </section>
    );
}
