import { useState, useEffect } from "react";

export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setItems(data.slice(startIndex, endIndex));
            });
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    return (
        <div>
            <h1>Pagination Example</h1>
            <div>
                <label htmlFor="itemsPerPage">Items per page: </label>
                <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={5}> 5 </option>
                    <option value={8}> 8 </option>
                    <option value={12}> 12 </option>
                </select>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button

                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}