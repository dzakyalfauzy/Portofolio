import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Layers } from "lucide-react";
import { Github } from "../Components/Icons";
import { ScrollReveal } from "../utils/scroll";
import api from "../api";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then((res) => {
                setProject(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <section style={{
                minHeight: "100vh", display: "flex", alignItems: "center",
                justifyContent: "center", backgroundColor: "#0a0a0a",
            }}>
                <div style={{
                    width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)",
                    borderTopColor: "#EF4444", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }} />
            </section>
        );
    }

    if (!project) {
        return (
            <section style={{
                minHeight: "100vh", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "1.5rem",
                backgroundColor: "#0a0a0a",
            }}>
                <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700 }}>Project Not Found</h1>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        padding: "0.75rem 2rem", borderRadius: 12,
                        background: "linear-gradient(135deg, #EF4444, #F97316)",
                        color: "#fff", border: "none", cursor: "pointer",
                        fontWeight: 600, fontSize: "0.875rem",
                    }}
                >
                    Back to Home
                </button>
            </section>
        );
    }

    const stack = Array.isArray(project.stack) ? project.stack : [];

    return (
        <section style={{
            minHeight: "100vh", backgroundColor: "#0a0a0a",
            padding: "6rem 0 4rem",
        }}>
            <div style={{
                maxWidth: 900, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)",
            }}>
                {/* Back button */}
                <ScrollReveal>
                    <motion.button
                        onClick={() => navigate("/#projects")}
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "0.5rem 1rem", borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.08)",
                            backgroundColor: "rgba(255,255,255,0.03)",
                            color: "#a1a1aa", fontSize: "0.8125rem", fontWeight: 500,
                            cursor: "pointer", marginBottom: "2.5rem",
                            transition: "color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#f5f5f5"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#a1a1aa"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </motion.button>
                </ScrollReveal>

                {/* Project image */}
                {project.image_path && (
                    <ScrollReveal>
                        <div style={{
                            width: "100%", borderRadius: 16, overflow: "hidden",
                            marginBottom: "2.5rem",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                        }}>
                            <img
                                src={project.image_path}
                                alt={project.title}
                                style={{
                                    width: "100%", height: "auto", display: "block",
                                    maxHeight: 480, objectFit: "cover",
                                }}
                            />
                        </div>
                    </ScrollReveal>
                )}

                {/* Title */}
                <ScrollReveal>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800,
                            color: "#f5f5f5", letterSpacing: "-0.03em", lineHeight: 1.15,
                            margin: "0 0 1rem 0",
                        }}
                    >
                        {project.title}
                    </motion.h1>
                </ScrollReveal>

                {/* Stack tags */}
                {stack.length > 0 && (
                    <ScrollReveal>
                        <div style={{
                            display: "flex", flexWrap: "wrap", gap: 8,
                            marginBottom: "2rem",
                        }}>
                            {stack.map((tech) => (
                                <span key={tech} style={{
                                    padding: "0.375rem 0.875rem", borderRadius: 8,
                                    border: "1px solid rgba(239, 68, 68, 0.15)",
                                    backgroundColor: "rgba(239, 68, 68, 0.05)",
                                    color: "#EF4444", fontSize: "0.8125rem", fontWeight: 600,
                                    letterSpacing: "0.02em",
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {/* Description */}
                <ScrollReveal>
                    <p style={{
                        fontSize: "1.0625rem", lineHeight: 1.8, color: "#a1a1aa",
                        maxWidth: "45rem", marginBottom: "2.5rem",
                    }}>
                        {project.description}
                    </p>
                </ScrollReveal>

                {/* Meta info */}
                <ScrollReveal>
                    <div style={{
                        display: "flex", flexWrap: "wrap", gap: "1.5rem",
                        marginBottom: "2.5rem",
                    }}>
                        {project.created_at && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#71717a", fontSize: "0.8125rem" }}>
                                <Calendar size={15} />
                                <span>{new Date(project.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                            </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#71717a", fontSize: "0.8125rem" }}>
                            <Layers size={15} />
                            <span>{stack.length} technologies</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Action buttons */}
                <ScrollReveal>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                    padding: "0.875rem 2rem", borderRadius: 12,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    color: "#d4d4d8", fontSize: "0.875rem", fontWeight: 600,
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                            >
                                <Github size={17} />
                                <span>Source Code</span>
                            </motion.a>
                        )}
                        {project.demo && (
                            <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                    padding: "0.875rem 2rem", borderRadius: 12,
                                    background: "linear-gradient(135deg, #EF4444, #F97316)",
                                    color: "#fff", fontSize: "0.875rem", fontWeight: 600,
                                    textDecoration: "none", border: "none",
                                    boxShadow: "0 10px 20px -5px rgba(239, 68, 68, 0.2)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <ExternalLink size={17} />
                                <span>Live Demo</span>
                            </motion.a>
                        )}
                    </div>
                </ScrollReveal>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </section>
    );
}
