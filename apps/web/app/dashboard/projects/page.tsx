"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/projects`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8">Loading projects...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
                        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer">
                            <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                            <p className="text-gray-500 mt-2 text-sm">{project.description || "No description"}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${project.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                                    }`}>
                                    {project.status.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-400">View Board &rarr;</span>
                            </div>
                        </div>
                    </Link>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-3 text-center text-gray-500 py-10 bg-white rounded border border-dashed">
                        No projects found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
