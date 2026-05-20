import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Github, Linkedin, Instagram } from "./Icons";
import "../../css/components/footer.css";

const navLinks = [
    { label: "Home", to: "/", hash: "" },
    { label: "About", to: "/", hash: "#about" },
    { label: "Services", to: "/", hash: "#services" },
    { label: "Projects", to: "/", hash: "#projects" },
    { label: "Certificates", to: "/", hash: "#certificates" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="layout-shell footer__shell">
                <div className="footer__row">
                    <div className="footer__brand-block">
                        <div className="footer__brand">
                            <div className="footer__logo">
                                <span className="footer__logo-text">D</span>
                            </div>
                            <span className="footer__name">Dzaky Al Fauzy</span>
                        </div>

                        <nav className="footer__nav">
                            {navLinks.map((link) => (
                                <Link key={link.label} to={`${link.to}${link.hash}`}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="footer__socials">
                        {[
                            { icon: Github, href: "https://github.com", label: "GitHub" },
                            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                            { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                        ].map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer__social"
                                aria-label={label}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="footer__top"
                        aria-label="Back to top"
                    >
                        <div className="footer__top-circle">
                            <ArrowUp size={20} />
                        </div>
                        <span className="footer__top-label">Top</span>
                    </button>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        &copy; {currentYear} Dzaky Al Fauzy. All rights reserved.
                    </p>
                    <div className="footer__legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>

            <div className="footer__accent-line" aria-hidden />
        </footer>
    );
}
