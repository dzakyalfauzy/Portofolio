import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, Building2, Calendar, Hash, ExternalLink, Sparkles } from "lucide-react";

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

export default function CertificateCard({ certificate, index = 0, isWide = false }) {
    const {
        title, issuer, image, image_path, date,
        credential, skills, verifyUrl, verify_url,
    } = certificate;

    const tags = Array.isArray(skills) ? skills : [];
    const displayImage = image_path || image;
    const displayVerifyUrl = verify_url || verifyUrl;

    const [imgError, setImgError] = useState(false);

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }, []);

    return (
        <motion.article
            variants={reveal3D}
            whileHover={{ y: -4 }}
            className={isWide ? "cert-bento__item cert-bento__item--wide" : "cert-bento__item"}
        >
            <div
                className="cert-bento__card group"
                onMouseMove={handleMouseMove}
            >
                {/* Mouse-tracking spotlight */}
                <div className="cert-bento__spotlight" aria-hidden />

                {/* Certificate image as background */}
                {displayImage && !imgError ? (
                    <img
                        src={displayImage}
                        alt={`${title} certificate`}
                        className="cert-bento__bg-img"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="cert-bento__bg-fallback" aria-hidden />
                )}

                {/* Gradient overlay for text readability */}
                <div className="cert-bento__overlay" aria-hidden />

                {/* Header row */}
                <div className="cert-bento__top">
                    <div className="cert-bento__award-wrap">
                        <Award className="cert-bento__award-icon" size={isWide ? 22 : 18} strokeWidth={1.5} />
                    </div>
                    <span className="cert-bento__date">
                        <Calendar size={12} strokeWidth={1.5} />
                        {date}
                    </span>
                </div>

                {/* Title + Issuer */}
                <h3 className="cert-bento__title">{title}</h3>
                <p className="cert-bento__issuer">
                    <Building2 size={14} strokeWidth={1.5} />
                    <span>{issuer}</span>
                </p>

                {/* Credential ID */}
                {credential && (
                    <p className="cert-bento__credential">
                        <Hash size={12} strokeWidth={1.5} />
                        <span>{credential}</span>
                    </p>
                )}

                {/* Skills / Tags */}
                {tags.length > 0 && (
                    <div className="cert-bento__tags">
                        {tags.map((tag) => (
                            <span key={tag} className="cert-bento__tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Verify button */}
                {displayVerifyUrl && (
                    <div className="cert-bento__actions">
                        <motion.a
                            href={displayVerifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="cert-bento__verify-btn"
                        >
                            <Sparkles size={14} strokeWidth={1.5} />
                            <span>Verify</span>
                            <ExternalLink size={13} strokeWidth={1.5} />
                        </motion.a>
                    </div>
                )}
            </div>
        </motion.article>
    );
}
