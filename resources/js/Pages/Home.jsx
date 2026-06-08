import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import IntroSequence from "../Components/IntroSequence";
// ❌ HAPUS: import Hero from "../Components/Hero"; (Sudah dipindah ke dalam IntroSequence)
import About from "../Components/About";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Certificates from "../Components/Certificates";
import Experience from "../Components/Experience";
import Contact from "../Components/Contact";

export default function Home() {
    const location = useLocation();
    const [data, setData] = useState({
        projects: [],
        certificates: [],
        experiences: [],
        skills: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/portfolio-data")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load portfolio data from backend:", err);
                setLoading(false);
            });
    }, []);

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
            <IntroSequence />
            
            <About />
            <Skills items={data.skills} loading={loading} />
            <Projects items={data.projects} loading={loading} />
            <Certificates items={data.certificates} loading={loading} />
            <Experience items={data.experiences} loading={loading} />
            <Contact />
        </>
    );
}