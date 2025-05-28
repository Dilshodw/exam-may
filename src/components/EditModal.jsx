import { useState, useEffect } from "react";
import { API } from "../utils/config";
import React from "react";

function EditModal({ isOpen, onClose, bookData, refreshBooks }) {
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (bookData) {
            setStatus(bookData.status || 1);
        }
    }, [bookData]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const updatedBook = {
                status,
            };

            await API.patch(`/books/${bookData._id}`, updatedBook);
            alert("Book details updated!");
            onClose();
            refreshBooks();
        } catch (error) {
            alert("Could not update the book. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-md p-6 max-w-md w-full shadow-md relative"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-4 text-gray-700 text-2xl font-bold hover:text-gray-900"
                >
                    &times;
                </button>

                <h3 className="text-xl font-semibold mb-5 text-gray-900">Edit Book</h3>

                <label className="block mb-1 text-gray-700 text-sm">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
                >
                    <option value={1} className="text-red-500">New</option>
                    <option value={2} className="text-yellow-500">Reading</option>
                    <option value={3} className="text-green-500">Finished</option>
                </select>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 border border-indigo-500 text-indigo-600 rounded py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
