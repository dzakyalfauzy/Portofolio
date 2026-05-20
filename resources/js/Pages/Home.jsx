import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Certificates from "../Components/Certificates";
import Experience from "../Components/Experience";
import Contact from "../Components/Contact";

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        const raw = location.hash?.replace(/^#/, "") ?? "";
        if (!raw) return undefined;
        const t = window.setTimeout(() => {
            document.getElementById(raw)?.scrollIntoView({ behavior: "smooth" });
        }, 80);
        return () => window.clearTimeout(t);
    }, [location.pathname, location.hash]);

    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Experience />
            <Contact />
        </>
    );
}
