import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Folder, ChevronLeft, ChevronRight } from "lucide-react";
import { Github } from "./Icons";
import "../../css/components/projects.css";

/* ===== Cyber Kinetic Unfold & Glow Sweep ===== */
const spring3D = { type: "spring", stiffness: 110, damping: 14, mass: 0.8 };

const reveal3D = {
    hidden: {
        opacity: 0, y: 120, rotateX: -65, rotateY: -10,
        scale: 0.75, filter: "blur(8px)",
    },
    visible: {
        opacity: 1, y: 0, rotateX: 0, rotateY: 0,
        scale: 1, filter: "blur(0px)", transition: spring3D,
    },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const themeColorMap = { violet: "emerald", purple: "emerald", fuchsia: "emerald" };
const getColor = (project) => themeColorMap[project?.color] || project?.color || "emerald";

/* ======================== FEATURED (HERO) ======================== */

function FeaturedHero({ project }) {
    if (!project) return null;
    const c = getColor(project);
    const hasImage = !!project.image_path;

    return (
        <motion.div
            key={project.id || project.title}
            variants={reveal3D}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)", transition: { duration: 0.3 } }}
            style={{ perspective: 1200 }}
            className={`projects__hero projects__hero--${c}`}
        >
            <div className="projects__hero-media">
                <div className={`projects__media-grad projects__media-grad--${c}`} />
                <div className="projects__media-grid" aria-hidden />
                {hasImage ? (
                    <img
                        src={project.image_path}
                        alt={project.title}
                        className="projects__hero-img"
                    />
                ) : (
                    <div className="projects__media-icon-wrap projects__media-icon-wrap--featured">
                        <div className={`projects__media-icon projects__media-icon--${c} projects__media-icon--featured`}>
                            <Folder size={48} />
                        </div>
                    </div>
                )}
                <div className={`projects__media-glow projects__media-glow--${c}`} aria-hidden />
            </div>

            <div className="projects__hero-body">
                <h3 className="projects__hero-title">{project.title}</h3>
                <p className="projects__hero-desc">{project.description}</p>
                <div className="projects__tags projects__tags--left">
                    {Array.isArray(project.stack) && project.stack.map((tech) => (
                        <span key={tech} className="projects__tag">{tech}</span>
                    ))}
                </div>
                <div className="projects__actions projects__actions--left">
                    {project.github && (
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="projects__btn-secondary"
                        >
                            <Github size={16} />
                            <span>Code</span>
                        </motion.a>
                    )}
                    {project.demo && (
                        <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="projects__btn-primary"
                        >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ======================== THUMBNAIL CARD ======================== */

function ThumbnailCard({ project, isActive, onClick, index }) {
    const c = getColor(project);
    const hasImage = !!project.image_path;

    return (
        <motion.div
            variants={reveal3D}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={`projects__thumb ${isActive ? "projects__thumb--active" : ""}`}
        >
            <div className={`projects__thumb-media projects__thumb-media--${c}`}>
                <div className={`projects__media-grad projects__media-grad--${c}`} />
                {hasImage ? (
                    <img src={project.image_path} alt={project.title} className="projects__thumb-img" />
                ) : (
                    <div className="projects__thumb-icon">
                        <Folder size={20} />
                    </div>
                )}
            </div>
            <div className="projects__thumb-info">
                <h4 className="projects__thumb-title">{project.title}</h4>
                <div className="projects__thumb-tags">
                    {Array.isArray(project.stack) && project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="projects__thumb-tag">{tech}</span>
                    ))}
                </div>
            </div>
            {isActive && (
                <motion.div
                    layoutId="thumb-indicator"
                    className="projects__thumb-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}
        </motion.div>
    );
}

/* ======================== SKELETON ======================== */

function ProjectSkeleton() {
    return (
        <div className="projects__hero" style={{ pointerEvents: "none" }}>
            <div className="projects__hero-media">
                <div className="skeleton" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="projects__hero-body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="skeleton" style={{ height: "28px", width: "50%" }} />
                <div className="skeleton" style={{ height: "48px", width: "100%" }} />
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <div className="skeleton" style={{ height: "18px", width: "60px", borderRadius: "4px" }} />
                    <div className="skeleton" style={{ height: "18px", width: "80px", borderRadius: "4px" }} />
                </div>
            </div>
        </div>
    );
}

/* ======================== MAIN COMPONENT ======================== */

export default function Projects({ items = [], loading = false }) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const carouselRef = useRef(null);
    const [activeProject, setActiveProject] = useState(items[0] || null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        if (items.length > 0 && !activeProject) {
            setActiveProject(items[0]);
        }
    }, [items]);

    const checkCarouselScroll = () => {
        const el = carouselRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    const scrollCarousel = (direction) => {
        const el = carouselRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.6;
        el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    };

    return (
        <section id="projects" ref={sectionRef} className="projects">
            <div className="projects__ambient" aria-hidden>
                <div className="projects__glow-tr" />
                <div className="projects__glow-bl" />
            </div>

            <div className="layout-shell">
                {/* ===== HEADER (staggered 3D reveal) ===== */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ perspective: 1000 }}
                    className="projects__header"
                >
                    <motion.span variants={reveal3D} className="projects__eyebrow">
                        Projects
                    </motion.span>
                    <motion.h2 variants={reveal3D} className="projects__title">
                        Featured <span className="projects__title-accent">work</span>
                    </motion.h2>
                    <motion.p variants={reveal3D} className="projects__lead">
                        A selection of projects I&apos;ve built — from full-stack apps to polished front-end experiences.
                    </motion.p>
                </motion.div>

                {loading ? (
                    <ProjectSkeleton />
                ) : (
                    <>
                        {/* ===== HERO / FEATURED ===== */}
                        <AnimatePresence mode="wait">
                            <FeaturedHero project={activeProject} />
                        </AnimatePresence>

                        {/* ===== THUMBNAIL CAROUSEL (staggered 3D reveal) ===== */}
                        {items.length > 1 && (
                            <div className="projects__carousel-wrap">
                                {canScrollLeft && (
                                    <button
                                        className="projects__carousel-btn projects__carousel-btn--left"
                                        onClick={() => scrollCarousel("left")}
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                )}

                                <motion.div
                                    ref={carouselRef}
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    style={{ perspective: 1000 }}
                                    className="projects__carousel"
                                    onScroll={checkCarouselScroll}
                                >
                                    {items.map((project, i) => (
                                        <ThumbnailCard
                                            key={project.id || project.title}
                                            project={project}
                                            index={i}
                                            isActive={activeProject?.id === project.id}
                                            onClick={() => setActiveProject(project)}
                                        />
                                    ))}
                                </motion.div>

                                {canScrollRight && (
                                    <button
                                        className="projects__carousel-btn projects__carousel-btn--right"
                                        onClick={() => scrollCarousel("right")}
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
