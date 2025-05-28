import { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard";
import Modal from "./Modal";
import { API } from "../utils/config";
import React from "react";

function Books({ searchTitle }) {
    const [bookList, setBookList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const debounceRef = useRef(null);

    const fetchAllBooks = async () => {
        try {
            const response = await API.get("/books");
            setBookList(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBooksByTitle = async (title) => {
        if (!title) {
            fetchAllBooks();
            return;
        }
        try {
            const response = await API.get(`/books/${title}`);
            setBookList(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetchBooksByTitle(searchTitle.trim());
        }, 5);

        return () => clearTimeout(debounceRef.current);
    }, [searchTitle]);

    const removeBook = async (id) => {
        try {
            await API.delete(`/books/${id}`);
            setBookList((prevList) => prevList.filter((book) => book._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllBooks();
    }, []);

    return (
        <div className="min-h-screen px-8 py-6 text-white">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        You've got{" "}
                        <span className="text-purple-600">
                            {bookList.length} {bookList.length === 1 ? "book" : "books"}
                        </span>
                    </h1>
                    <p className="text-md mt-3">Your books today</p>
                </div>
                <button
                    className="bg-purple-600 hover:opacity-90 text-white px-4 py-2 rounded text-sm"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Create a book
                </button>
            </header>

            <section className="flex flex-wrap gap-[50px]">
                {bookList.map((book) => (
                    <BookCard key={book._id} book={book} onDelete={removeBook} fetchBooks={fetchAllBooks} />
                ))}
            </section>

            <Modal open={isModalOpen} close={() => setIsModalOpen(false)} fetchBooks={fetchAllBooks} />
        </div>
    );
}

export default Books;
