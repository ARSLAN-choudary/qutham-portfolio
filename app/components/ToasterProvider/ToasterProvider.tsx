"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 2000,
                style: {
                    background: "linear-gradient(90deg, #1e3a8a, #db2777)",
                    color: "#fff",
                    border: "1px solid #38bdf8",
                    boxShadow: "0 0 25px rgba(219, 39, 119, 0.6)",
                    fontWeight: "600",
                    padding: "14px 20px",
                    borderRadius: "10px",
                },
                success: {
                    iconTheme: {
                        primary: "#38bdf8",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ff4d94",
                        secondary: "#fff",
                    },
                },
            }}
        />
    );
}
