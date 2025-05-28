import React from 'react';



function DeleteModal({ isVisible, onClose, bookTitle, onConfirmDelete }) {
    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg w-full max-w-sm relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    aria-label="Close modal"
                    className="absolute top-2 right-4 text-black text-xl font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-black mb-4 text-2xl">Confirm Delete</h2>
                <p className="text-black mb-6">
                    Are you sure you want to delete <strong>"{bookTitle}"</strong>?
                </p>
                <div className="flex justify-between gap-4">
                    <button
                        className="w-1/2 px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-1/2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={onConfirmDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
