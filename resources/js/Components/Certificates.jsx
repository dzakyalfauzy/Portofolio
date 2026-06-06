import { useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { ScrollReveal } from "../utils/scroll";
import CertificateCard from "./CertificateCard";
import "../../css/components/certificates.css";

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

    return (
        <section id="certificates" ref={sectionRef} className="certificates">
            <div className="layout-shell">
                {/* ===== HEADER ===== */}
                <ScrollReveal className="certificates__header">
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
                </ScrollReveal>

                {/* ===== BENTO GRID ===== */}
                <div className="cert-bento">
                    {loading ? (
                        <>
                            <CertificateSkeleton span2 />
                            <CertificateSkeleton span2 />
                            <CertificateSkeleton />
                            <CertificateSkeleton />
                        </>
                    ) : (
                        items.map((cert, i) => (
                            <ScrollReveal
                                key={cert.id || cert.credential}
                                className={i < 2 ? "cert-bento__item cert-bento__item--wide" : "cert-bento__item"}
                            >
                                <CertificateCard
                                    certificate={cert}
                                    index={i}
                                    isWide={i < 2}
                                />
                            </ScrollReveal>
                        ))
                    )}
                </div>

                {!loading && items.length === 0 && (
                    <p className="mt-20 text-center text-[#94a3b8]">
                        No certificates added yet.
                    </p>
                )}
            </div>
        </section>
    );
}
