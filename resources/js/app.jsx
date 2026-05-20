import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import BackgroundEffects from "./Components/BackgroundEffects";
import "../css/components/app-layout.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <BackgroundEffects />
                <div className="app__content">
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <main className="app__main">
                                    <Home />
                                </main>
                            }
                        />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

const container = document.getElementById("app");
if (container) {
    createRoot(container).render(<App />);
}
