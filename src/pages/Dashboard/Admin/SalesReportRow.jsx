import React, { useState } from "react";
import { jsPDF } from "jspdf";

const SalesReportRow = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    // Handle Search
    const filteredData = data.filter((item) =>
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle Sorting
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc":"",
        }));
    };

    // Handle Sorting for Dropdown
    const handleDropdownSort = (direction) => {
        setSortConfig({ key: "price", direction });
    };

    // PDF Download
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Invoice Data", 20, 20);

        // Table Header
        doc.setFontSize(12);
        doc.text("Email", 20, 40);
        doc.text("Seller Email", 80, 40);
        doc.text("Name", 160, 40);
        doc.text("Price", 240, 40);

        // Table Rows
        let y = 60;
        sortedData.forEach((item) => {
            doc.text(item.email, 20, y);
            doc.text(item.sellerEmail.join(", "), 80, y);
            doc.text(item.name.join(", "), 160, y);
            doc.text(`${item.price}$`, 240, y);
            y += 20;
        });

        doc.save("invoice.pdf");
    };

    return (
        <div className="max-w-7xl mx-auto p-5">
            <div className="flex justify-between items-center mb-5">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="p-2 border rounded-md w-1/3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Sort Dropdown */}
                <select
                    className="p-2 border rounded-md"
                    onChange={(e) => handleDropdownSort(e.target.value)}
                >
                    <option value="asc">Sort by Price</option>
                    <option value="asc">Sort by Price: Ascending</option>
                    <option value="desc">Sort by Price: Descending</option>
                </select>

                {/* PDF Download */}
                <button
                    className="bg-primary text-black font-bold px-4 py-2 rounded-md"
                    onClick={handleDownloadPDF}
                >
                    Download PDF
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-left">
                            <th
                                className="border border-gray-400 px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("sellerEmail")}
                            >
                                Seller Email
                            </th>
                            <th
                                className="border border-gray-400 px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("email")}
                            >
                                Buyer Email
                            </th>

                            <th
                                className="border border-gray-400 px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("name")}
                            >
                                Name
                            </th>

                            <th
                                className="border border-gray-400 px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("price")}
                            >
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.sellerEmail[0]}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                                <td className="border border-gray-300 px-4 gap-2 flex py-2">
                                    {item.name.map((item, index) => (
                                        <li className="list-none" key={index}>
                                            {index + 1} {item}
                                        </li>
                                    ))}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.price}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReportRow;
