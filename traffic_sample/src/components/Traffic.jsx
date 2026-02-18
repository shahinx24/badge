import { useState, useEffect } from "react";
import "./traffic.css";

export default function Traffic() {
    const [light, setLight] = useState("red");

    useEffect(() => {
        const interval = setInterval(() => {
            setLight((prev) => {
                if (prev === "red") return "green";
                if (prev === "green") return "yellow";
                return "red";
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="traffic-container">
            <div className={`light red ${light === "red" ? "active" : ""}`} />
            <div className={`light yellow ${light === "yellow" ? "active" : ""}`} />
            <div className={`light green ${light === "green" ? "active" : ""}`} />
        </div>
    );
}