import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
import Trash from "../assets/trash.png";
import Edit from "../assets/edit.png";
import React from "react";

function BookCard({ book, onDelete, fetchBooks }) {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const renderStatusBadge = (statusCode) => {
        const styles = "px-3 py-1 rounded-[8.5px] text-sm text-white";
        if (statusCode === 1) return <span className={`bg-red-500 ${styles}`}>New</span>;
        if (statusCode === 2) return <span className={`bg-yellow-400 ${styles}`}>Reading</span>;
        if (statusCode === 3) return <span className={`bg-green-500 ${styles}`}>Finished</span>;
        return null;
    };

    const confirmDelete = () => {
        onDelete(book._id);
        setDeleteModalVisible(false);
    };

    return (
        <div className="relative group bg-white text-black rounded-xl shadow-md p-5 w-[397px] h-[214px]">
            <DeleteModal
                isVisible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                bookTitle={book.title}
                onConfirmDelete={confirmDelete}
            />
            <EditModal
                isOpen={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                bookData={book}
                refreshBooks={fetchBooks}
            />

            <div className="absolute z-10 top-3 -right-[34px] flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8" onClick={() => setDeleteModalVisible(true)}>
                    <img
                        src={Trash}
                        alt="Delete"
                        className="w-full shadow-lg rounded h-full bg-[#FF4D4F] p-[8px] hover:opacity-90"
                    />
                </button>
                <button className="w-8 h-8" onClick={() => setEditModalVisible(true)}>
                    <img
                        src={Edit}
                        alt="Edit"
                        className="w-full shadow-lg rounded h-full p-[8px] bg-yellow-500 hover:opacity-90"
                    />
                </button>
            </div>

            <h2 className="font-semibold mb-1">{book.title}</h2>
            <p>
                Cover:{" "}
                <Link to={book.cover} className="text-blue-500">
                    {book.cover}
                </Link>
            </p>
            <p className="mt-1">Pages: {book.pages}</p>
            <p className="mt-1">Published: {new Date(book.published).getFullYear()}</p>
            <p className="mt-1">Isbn: {book.isbn}</p>
            <p className="mt-[20px] text-sm text-gray-700">{book.author ?? "Unknown Author"}</p>
            <div className="absolute bottom-4 right-4">{renderStatusBadge(book.status)}</div>
        </div>
    );
}

export default BookCard;
