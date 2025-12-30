"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<any>({ revenue: 0, overdueInvoices: 0, pendingTasks: 0, totalProjects: 0 });
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        // Fetch Profile
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => setUser(data))
            .catch(() => router.push("/login"));

        // Fetch Stats
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/analytics/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error("Failed to fetch stats", err));

    }, [router]);

    if (!user) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.name || user.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white rounded shadow border-l-4 border-indigo-500">
                    <h3 className="font-bold text-gray-500 uppercase text-xs">Total Revenue</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">${Number(stats.revenue || 0).toFixed(2)}</p>
                </div>
                <div className="p-6 bg-white rounded shadow border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-500 uppercase text-xs">Overdue Invoices</h3>
                    <p className="text-3xl font-bold mt-2 text-red-600">{stats.overdueInvoices}</p>
                </div>
                <div className="p-6 bg-white rounded shadow border-l-4 border-yellow-500">
                    <h3 className="font-bold text-gray-500 uppercase text-xs">Pending Tasks</h3>
                    <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.pendingTasks}</p>
                </div>
                <div className="p-6 bg-white rounded shadow border-l-4 border-green-500">
                    <h3 className="font-bold text-gray-500 uppercase text-xs">Active Projects</h3>
                    <p className="text-3xl font-bold mt-2 text-green-600">{stats.totalProjects}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {/* Activity feed placeholder */}
                        <div className="text-sm text-gray-500">
                            No recent activity recorded.
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-2 flex flex-col">
                        <button className="text-left text-indigo-600 hover:underline">Create New Client</button>
                        <button className="text-left text-indigo-600 hover:underline">Draft Invoice</button>
                        <button className="text-left text-indigo-600 hover:underline">Add Project Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
