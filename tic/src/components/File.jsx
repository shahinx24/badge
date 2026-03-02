import "./style/file.css"
import { useState } from "react"

export default function File() {
    const [turn, setTurn] = useState(1);
    const [board, setBoard] = useState(Array(9).fill(null));

    function check(id) {
        if (board[id] === null) {
            const newBoard = [...board];

            if (turn === 1) {
                newBoard[id] = "X";
                setTurn(2);
            } else {
                newBoard[id] = "O";
                setTurn(1);
            }

            setBoard(newBoard);
        }
    }

    return (
        <div className="board">
            <div className="board">
                {board.map((value, i) => (
                    <div
                        key={i}
                        className={`cell ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
                        onClick={() => check(i)}
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    )
}