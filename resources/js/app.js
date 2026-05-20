import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">
                Laravel + React + Tailwind 🚀
            </h1>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)