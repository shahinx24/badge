import { useEffect, useState } from "react";
import "./trafficLight.css";

export default function TrafficLight() {
    const [light, setLight] = useState("red");

    useEffect(() => {
        const interval = setInterval(() => {
            setLight((prev) => {
                if (prev === "red") return "green";
                if (prev === "green") return "yellow";
                return "red";
            });
        }, 1000); // change every 1 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="traffic-container">
            <div className={`light red ${light === "red" ? "active" : ""}`} />
            <div className={`light yellow ${light === "yellow" ? "active" : ""}`} />
            <div className={`light green ${light === "green" ? "active" : ""}`} />
        </div>
        </>
    );
}