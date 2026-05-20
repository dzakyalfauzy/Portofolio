import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import "../../css/components/experience.css";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

const experiences = [
    {
        title: "Senior Full‑Stack Developer",
        company: "Tech Innovations Inc.",
        location: "Remote",
        duration: "Jan 2024 – Present",
        description:
            "Leading development of scalable web applications serving 50k+ users. Architecting front‑end systems with React and building robust APIs with Laravel. Mentoring junior developers and conducting code reviews.",
        stack: ["React", "Laravel", "TypeScript", "PostgreSQL", "AWS"],
        current: true,
    },
    {
        title: "Full‑Stack Developer",
        company: "Digital Agency Co.",
        location: "Jakarta, ID",
        duration: "Jun 2022 – Dec 2023",
        description:
            "Built and maintained client‑facing web applications across multiple industries. Collaborated with designers to deliver pixel‑perfect UIs. Improved page load performance by 40% through code optimization.",
        stack: ["React", "Next.js", "TailwindCSS", "Node.js", "MySQL"],
        current: false,
    },
    {
        title: "Junior Web Developer",
        company: "StartUp Studio",
        location: "Jakarta, ID",
        duration: "Jan 2021 – May 2022",
        description:
            "Developed responsive websites and internal tools. Gained deep expertise in PHP, Laravel, and modern JavaScript. Participated in agile sprints and contributed to CI/CD pipeline setup.",
        stack: ["PHP", "Laravel", "JavaScript", "MySQL", "Git"],
        current: false,
    },
    {
        title: "Freelance Developer",
        company: "Self‑Employed",
        location: "Remote",
        duration: "2020 – 2021",
        description:
            "Delivered custom websites and e‑commerce solutions for small businesses. Managed full project lifecycle from requirements gathering to deployment and maintenance.",
        stack: ["HTML", "CSS", "JavaScript", "WordPress", "Figma"],
        current: false,
    },
];

function TimelineItem({ exp, index, isInView }) {
    return (
        <motion.div
            variants={fadeUp(index * 0.12)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="experience-item"
        >
            <motion.div whileHover={{ y: -2 }} className="experience-item__card">
                {exp.current && (
                    <div className="experience-item__badge-row">
                        <span className="experience-item__badge">
                            <span className="experience-item__badge-dot" />
                            Current
                        </span>
                    </div>
                )}

                <h3 className="experience-item__title">{exp.title}</h3>
                <div className="experience-item__meta">
                    <span className="experience-item__company">
                        <Briefcase size={13} />
                        {exp.company}
                    </span>
                    <span className="experience-item__muted">
                        <MapPin size={12} />
                        {exp.location}
                    </span>
                    <span className="experience-item__muted">
                        <Calendar size={12} />
                        {exp.duration}
                    </span>
                </div>

                <p className="experience-item__desc">{exp.description}</p>

                <div className="experience-item__tags">
                    {exp.stack.map((tech) => (
                        <span key={tech} className="experience-item__tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="experience" ref={sectionRef} className="experience">
            <div className="experience__ambient" aria-hidden>
                <div className="experience__glow-1" />
                <div className="experience__glow-2" />
            </div>

            <div className="layout-shell layout-shell--narrow">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="experience__header"
                >
                    <span className="experience__eyebrow">Experience</span>
                    <h2 className="experience__title">
                        My professional <span className="experience__title-accent">journey</span>
                    </h2>
                    <p className="experience__lead">
                        A timeline of roles, challenges, and growth across different teams and projects.
                    </p>
                </motion.div>

                <div className="experience__timeline">
                    {experiences.map((exp, i) => (
                        <TimelineItem key={exp.company + exp.title} exp={exp} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
