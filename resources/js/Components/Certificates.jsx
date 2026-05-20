import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Layers, ShieldCheck } from "lucide-react";
import CertificateCard from "./CertificateCard";
import { certificates, certificateCategories } from "../data/certificates";
import "../../css/components/certificates.css";

export default function Certificates() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = useMemo(() => {
        if (activeCategory === "All") return certificates;
        return certificates.filter((c) => c.category === activeCategory);
    }, [activeCategory]);

    return (
        <section id="certificates" ref={sectionRef} className="certificates">
            <div className="certificates__ambient" aria-hidden>
                <div className="certificates__glow-tr" />
                <div className="certificates__glow-bl" />
            </div>

            <div className="layout-shell">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="certificates__header"
                >
                    <div className="certificates__eyebrow-wrap">
                        <span className="certificates__eyebrow">
                            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Credentials
                        </span>
                    </div>
                    <h2 className="certificates__title">
                        Verified <span className="certificates__title-accent">Certificates</span>
                    </h2>
                    <p className="certificates__lead">
                        A curated record of courses and certifications across frontend, backend, design, and
                        infrastructure — built to stay transparent and verifiable.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
                                        ? "border-violet-400/50 bg-white/10 text-white shadow-[0_0_28px_rgba(139,92,246,0.28)]"
                                        : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="cert-filter-pill"
                                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600/35 via-fuchsia-500/25 to-cyan-500/30"
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

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.15 }}
                    className="mt-6 text-sm text-zinc-500 text-center lg:text-left"
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

                <AnimatePresence mode="popLayout">
                    <motion.ul
                        key={activeCategory}
                        layout
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="certificates__grid"
                    >
                        {filtered.map((cert, i) => (
                            <li key={cert.credential} className="list-none">
                                <CertificateCard certificate={cert} index={i} />
                            </li>
                        ))}
                    </motion.ul>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <p className="mt-20 text-center text-zinc-500">
                        No certificates in this category yet.
                    </p>
                )}
            </div>
        </section>
    );
}
