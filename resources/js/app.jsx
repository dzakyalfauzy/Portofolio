import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ProjectDetail from "./Pages/ProjectDetail";
import Footer from "./Components/Footer";
import BackgroundEffects from "./Components/BackgroundEffects";
import AdminLogin from "./Pages/Admin/Login";
import AdminDashboard from "./Pages/Admin/Dashboard";
import "../css/components/app-layout.css";

function PublicLayout() {
    return (
        <>
            <Navbar />
            <main className="app__main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <BackgroundEffects />
                <div className="app__content">
                    <Routes>
                        {/* Public Route Group with Navbar & Footer */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/project/:id" element={<ProjectDetail />} />
                        </Route>

                        {/* Admin Route Group without public Navbar/Footer */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/*" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

const container = document.getElementById("app");
if (container) {
    createRoot(container).render(<App />);
}
