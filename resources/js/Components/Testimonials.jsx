import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import "../../css/components/testimonials.css";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

const testimonials = [
    {
        name: "Ahmad Rizky",
        role: "CEO, TechVenture",
        text: "Kualitas kerjanya luar biasa. Website yang dibangun sangat responsif, cepat, dan desainnya modern. Sangat puas dengan hasilnya dan akan bekerja sama lagi di project selanjutnya.",
        rating: 5,
        color: "violet",
    },
    {
        name: "Sarah Putri",
        role: "Product Manager, StartUp ID",
        text: "Developer yang sangat profesional dan komunikatif. Selalu memberikan update progress dan hasil akhirnya bahkan melebihi ekspektasi kami. Highly recommended!",
        rating: 5,
        color: "indigo",
    },
    {
        name: "Budi Santoso",
        role: "CTO, Digital Prima",
        text: "Kemampuan teknis yang sangat solid, baik di front‑end maupun back‑end. Problem solving‑nya cepat dan kode yang ditulis bersih serta well‑documented.",
        rating: 5,
        color: "sky",
    },
    {
        name: "Diana Kusuma",
        role: "Founder, CreativeHub",
        text: "Desain UI/UX yang dihasilkan sangat elegan dan user‑friendly. Proses development‑nya juga tepat waktu. Terima kasih atas kerja kerasnya!",
        rating: 4,
        color: "rose",
    },
    {
        name: "Fajar Nugroho",
        role: "Marketing Director, E‑Shop",
        text: "Platform e‑commerce yang dibuat berhasil meningkatkan konversi kami sebesar 35%. Performanya cepat dan fitur‑fiturnya lengkap sesuai kebutuhan bisnis kami.",
        rating: 5,
        color: "emerald",
    },
    {
        name: "Lisa Andriani",
        role: "Project Lead, Agency360",
        text: "Sangat detail dan teliti dalam mengerjakan setiap fitur. Responsif terhadap feedback dan selalu memberikan solusi terbaik untuk setiap tantangan teknis.",
        rating: 5,
        color: "amber",
    },
];

function TestimonialCard({ item, index, isInView }) {
    const c = item.color;

    return (
        <motion.div
            variants={fadeUp(index * 0.08)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -4 }}
            className={`testimonials__card testimonials__card--${c}`}
        >
            <Quote size={28} className={`testimonials__quote testimonials__quote--${c}`} />

            <p className="testimonials__text">&ldquo;{item.text}&rdquo;</p>

            <div className="testimonials__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={15}
                        className={
                            i < item.rating
                                ? `testimonials__star-fill testimonials__star--${c}`
                                : "testimonials__star-fill testimonials__star--empty"
                        }
                    />
                ))}
            </div>

            <div className="testimonials__footer">
                <div className={`testimonials__avatar testimonials__avatar--${c}`}>{item.name.charAt(0)}</div>
                <div className="testimonials__meta">
                    <p className="testimonials__name">{item.name}</p>
                    <p className="testimonials__role">{item.role}</p>
                </div>
            </div>

            <div className={`testimonials__corner-glow testimonials__corner-glow--${c}`} aria-hidden />
        </motion.div>
    );
}

export default function Testimonials() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="testimonials" ref={sectionRef} className="testimonials">
            <div className="testimonials__ambient" aria-hidden>
                <div className="testimonials__glow" />
            </div>

            <div className="layout-shell">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="testimonials__header"
                >
                    <span className="testimonials__eyebrow">Testimoni</span>
                    <h2 className="testimonials__title">
                        Apa kata <span className="testimonials__title-accent">klien saya</span>
                    </h2>
                    <p className="testimonials__lead">
                        Feedback dan ulasan dari klien yang pernah bekerja sama dengan saya di berbagai project.
                    </p>
                </motion.div>

                <div className="testimonials__grid">
                    {testimonials.map((item, i) => (
                        <TestimonialCard key={item.name} item={item} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
