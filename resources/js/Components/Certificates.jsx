import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Layers, ShieldCheck } from "lucide-react";
import CertificateCard from "./CertificateCard";
import "../../css/components/certificates.css";

/* ===== Premium Reveal Variants ===== */
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

const certificateCategories = ["All", "Frontend", "Backend", "UI/UX", "DevOps", "Mobile"];

function CertificateSkeleton({ span2 }) {
    return (
        <div className={span2 ? "cert-bento__item cert-bento__item--wide" : "cert-bento__item"}>
            <div className="cert-bento__card" style={{ pointerEvents: "none" }}>
                <div className="skeleton" style={{ height: "20px", width: "50%", borderRadius: "4px" }} />
                <div className="skeleton" style={{ height: "14px", width: "35%", borderRadius: "4px", marginTop: "12px" }} />
                <div style={{ display: "flex", gap: "6px", marginTop: "16px" }}>
                    <div className="skeleton" style={{ height: "20px", width: "50px", borderRadius: "4px" }} />
                    <div className="skeleton" style={{ height: "20px", width: "70px", borderRadius: "4px" }} />
                </div>
            </div>
        </div>
    );
}

export default function Certificates({ items = [], loading = false }) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = useMemo(() => {
        if (activeCategory === "All") return items;
        return items.filter((c) => c.category?.toLowerCase() === activeCategory.toLowerCase());
    }, [items, activeCategory]);

    return (
        <section id="certificates" ref={sectionRef} className="certificates">
            <div className="certificates__ambient" aria-hidden>
                <div className="certificates__glow-tr" />
                <div className="certificates__glow-bl" />
            </div>

            <div className="layout-shell">
                {/* ===== HEADER (staggered 3D reveal) ===== */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ perspective: 1000 }}
                    className="certificates__header"
                >
                    <motion.div variants={reveal3D} className="certificates__eyebrow-wrap">
                        <span className="certificates__eyebrow">
                            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Credentials
                        </span>
                    </motion.div>
                    <motion.h2 variants={reveal3D} className="certificates__title">
                        Verified <span className="certificates__title-accent">Certificates</span>
                    </motion.h2>
                    <motion.p variants={reveal3D} className="certificates__lead">
                        A curated record of courses and certifications across frontend, backend, design, and
                        infrastructure — built to stay transparent and verifiable.
                    </motion.p>
                </motion.div>

                {/* ===== FILTERS ===== */}
                <motion.div
                    variants={reveal3D}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="certificates__filters"
                    role="tablist"
                    aria-label="Filter certificates by category"
                >
                    {certificateCategories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <motion.button
                                key={cat}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveCategory(cat)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "border-emerald-400/50 bg-white/10 text-white shadow-[0_0_28px_rgba(16, 185, 129,0.28)]"
                                        : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="cert-filter-pill"
                                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-emerald-600/35 via-teal-500/25 to-cyan-500/30"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                {cat === "All" ? (
                                    <span className="inline-flex items-center gap-1.5">
                                        <Layers className="h-4 w-4 opacity-80" strokeWidth={1.5} />
                                        {cat}
                                    </span>
                                ) : (
                                    cat
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {!loading && (
                    <motion.p
                        variants={reveal3D}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="certificates__count"
                    >
                        Showing{" "}
                        <span className="font-medium text-zinc-300">{filtered.length}</span>{" "}
                        {filtered.length === 1 ? "credential" : "credentials"}
                        {activeCategory !== "All" ? (
                            <>
                                {" "}
                                in <span className="text-zinc-300">{activeCategory}</span>
                            </>
                        ) : null}
                    </motion.p>
                )}

                {/* ===== BENTO GRID (staggered 3D reveal) ===== */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeCategory}
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        exit={{ opacity: 0 }}
                        style={{ perspective: 1200 }}
                        className="cert-bento"
                    >
                        {loading ? (
                            <>
                                <CertificateSkeleton span2 />
                                <CertificateSkeleton span2 />
                                <CertificateSkeleton />
                                <CertificateSkeleton />
                            </>
                        ) : (
                            filtered.map((cert, i) => (
                                <CertificateCard
                                    key={cert.id || cert.credential}
                                    certificate={cert}
                                    index={i}
                                    isWide={i < 2}
                                />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>

                {!loading && filtered.length === 0 && (
                    <p className="mt-20 text-center text-zinc-500">
                        No certificates in this category yet.
                    </p>
                )}
            </div>
        </section>
    );
}
