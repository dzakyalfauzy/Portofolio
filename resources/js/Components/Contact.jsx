import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Github, Linkedin, Instagram } from "./Icons";
import "../../css/components/contact.css";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="contact__ambient" aria-hidden>
                <div className="contact__glow contact__glow--tr" />
                <div className="contact__glow contact__glow--bl" />
            </div>

            <div className="layout-shell">
                <div className="contact__intro">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp(0)}
                        className="contact__title"
                    >
                        Ready to start a{" "}
                        <span className="contact__title-accent">new project?</span>
                    </motion.h2>
                </div>

                <div className="contact__grid">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp(0.2)}
                        className="contact__info"
                    >
                        <div className="contact__info-text">
                            <h3 className="contact__subtitle">Let&apos;s connect</h3>
                            <p className="contact__description">
                                I&apos;m currently open to new opportunities and collaborations. Feel free to reach out for a project or just a quick chat!
                            </p>
                        </div>

                        <div className="contact__socials">
                            {[
                                { icon: Github, href: "https://github.com", label: "GitHub" },
                                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
                            ].map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="contact__social-link"
                                >
                                    <Icon size={19} className="contact__social-icon" />
                                    <span className="contact__social-label">{label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp(0.3)}
                        className="contact__form-shell"
                    >
                        <div className="contact__form-inner">
                            <form className="contact__form">
                                <div className="contact__field">
                                    <label htmlFor="contact-email" className="contact__label">
                                        Email Address
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        placeholder="email@example.com"
                                        className="contact__input"
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="contact-message" className="contact__label">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className="contact__textarea"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 0 30px rgba(139,92,246,0.5)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="contact__submit"
                                >
                                    <Send size={18} className="contact__submit-icon" />
                                    <span>Send Message</span>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
