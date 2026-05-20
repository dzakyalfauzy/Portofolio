import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { Github } from "./Icons";
import "../../css/components/projects.css";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

const projects = [
    {
        title: "E‑Commerce Platform",
        description:
            "Full‑featured online store with payment integration, real‑time inventory, and an admin dashboard for managing products and orders.",
        stack: ["React", "Laravel", "MySQL", "Stripe"],
        github: "https://github.com",
        demo: "https://example.com",
        color: "violet",
    },
    {
        title: "Project Management App",
        description:
            "Kanban‑style task tracker with drag‑and‑drop, team collaboration, real‑time updates, and deadline notifications.",
        stack: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
        github: "https://github.com",
        demo: "https://example.com",
        color: "indigo",
    },
    {
        title: "AI Content Generator",
        description:
            "SaaS tool that uses AI to generate marketing copy, blog posts, and social media content with customizable tone and style.",
        stack: ["React", "Python", "OpenAI", "TailwindCSS"],
        github: "https://github.com",
        demo: "https://example.com",
        color: "sky",
    },
    {
        title: "Portfolio Website",
        description:
            "Modern personal portfolio with dark theme, smooth animations, glassmorphism effects, and a fully responsive design.",
        stack: ["React", "TailwindCSS", "Framer Motion", "Vite"],
        github: "https://github.com",
        demo: "https://example.com",
        color: "rose",
    },
    {
        title: "Real‑Time Chat App",
        description:
            "Instant messaging application with group chats, file sharing, read receipts, and end‑to‑end message encryption.",
        stack: ["React", "Firebase", "WebRTC", "TailwindCSS"],
        github: "https://github.com",
        demo: "https://example.com",
        color: "amber",
    },
    {
        title: "Analytics Dashboard",
        description:
            "Data visualization dashboard with interactive charts, custom filters, CSV export, and role‑based access control.",
        stack: ["Next.js", "D3.js", "Laravel", "Redis"],
        github: "https://github.com",
        demo: "https://example.com",
        color: "emerald",
    },
];

function ProjectCard({ project, index, isInView }) {
    const c = project.color;

    return (
        <motion.div
            variants={fadeUp(index * 0.08)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -6 }}
            className={`projects__card projects__card--${c}`}
        >
            <div className="projects__media">
                <div className={`projects__media-grad projects__media-grad--${c}`} />
                <div className="projects__media-grid" aria-hidden />
                <div className="projects__media-icon-wrap">
                    <div className={`projects__media-icon projects__media-icon--${c}`}>
                        <Folder size={22} />
                    </div>
                </div>
                <div className={`projects__media-glow projects__media-glow--${c}`} aria-hidden />
                <div className={`projects__media-line projects__media-line--${c}`} aria-hidden />
            </div>

            <div className="projects__body">
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>
                <div className="projects__tags">
                    {project.stack.map((tech) => (
                        <span key={tech} className="projects__tag">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="projects__actions">
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
                    <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="projects__btn-primary"
                    >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="projects" ref={sectionRef} className="projects">
            <div className="projects__ambient" aria-hidden>
                <div className="projects__glow-tr" />
                <div className="projects__glow-bl" />
            </div>

            <div className="layout-shell">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="projects__header"
                >
                    <span className="projects__eyebrow">Projects</span>
                    <h2 className="projects__title">
                        Featured <span className="projects__title-accent">work</span>
                    </h2>
                    <p className="projects__lead">
                        A selection of projects I&apos;ve built — from full‑stack apps to polished front‑end
                        experiences.
                    </p>
                </motion.div>

                <div className="projects__grid">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
