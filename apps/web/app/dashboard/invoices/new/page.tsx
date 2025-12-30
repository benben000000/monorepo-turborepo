"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
    const [clients, setClients] = useState<any[]>([]);
    const [formData, setFormData] = useState({ clientId: "", total: "", dueDate: "" });
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/clients`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setClients(Array.isArray(data) ? data : []));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/invoices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        router.push("/dashboard/invoices");
    };

    return (
        <div className="p-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Client</label>
                    <select
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2 border"
                        value={formData.clientId}
                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                    >
                        <option value="">Select a client</option>
                        {clients.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <input
                        type="number"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2 border"
                        value={formData.total}
                        onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2 border"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Generate Invoice
                </button>
            </form>
        </div>
    );
}
