"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        await fetch("http://localhost:3001/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        router.push("/dashboard/clients");
    };

    return (
        <div className="p-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Add New Client</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Create Client
                </button>
            </form>
        </div>
    );
}
