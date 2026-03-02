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
            <div className="cell" onClick={() => check(0)}>
                {board[0]}
            </div>
            <div className="cell" onClick={() => check(1)}>
                {board[1]}
            </div>
            <div className="cell" onClick={() => check(2)}>
                {board[2]}
            </div>
            <div className="cell" onClick={() => check(3)}>
                {board[3]}
            </div>
            <div className="cell" onClick={() => check(4)}>
                {board[4]}
            </div>
            <div className="cell" onClick={() => check(5)}>
                {board[5]}
            </div>
            <div className="cell" onClick={() => check(6)}>
                {board[6]}
            </div>
            <div className="cell" onClick={() => check(7)}>
                {board[7]}
            </div>
            <div className="cell" onClick={() => check(8)}>
                {board[8]}
            </div>
        </div>
    )
}