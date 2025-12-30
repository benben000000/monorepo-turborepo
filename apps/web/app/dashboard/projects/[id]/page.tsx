"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectBoardPage() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Fetch project with tasks
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-8">Loading board...</div>;
    if (!project) return <div className="p-8">Project not found</div>;

    const columns = [
        { id: "todo", title: "To Do" },
        { id: "in_progress", title: "In Progress" },
        { id: "done", title: "Done" },
    ];

    const tasks = project.tasks || [];

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{project.name} <span className="text-gray-400 font-normal">/ Board</span></h1>
            </div>

            <div className="flex-1 flex space-x-6 overflow-x-auto pb-4">
                {columns.map((col) => {
                    const colTasks = tasks.filter((t: any) => t.status === col.id);
                    return (
                        <div key={col.id} className="w-80 flex-shrink-0 bg-gray-100 rounded-lg p-4 flex flex-col">
                            <h3 className="font-bold text-gray-700 mb-4 flex justify-between">
                                {col.title}
                                <span className="bg-gray-200 px-2 rounded text-sm">{colTasks.length}</span>
                            </h3>
                            <div className="flex-1 space-y-3 overflow-y-auto">
                                {colTasks.map((task: any) => (
                                    <div key={task.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-grab hover:shadow-md">
                                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                                        {task.assignee && (
                                            <div className="mt-2 text-xs text-gray-500">
                                                Assigned: {task.assignee.name || "User"}
                                            </div>
                                        )}
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className={`text-xs px-1.5 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {task.priority || 'Normal'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-2 text-gray-500 hover:bg-gray-200 rounded text-sm text-left px-2">
                                    + Add task
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
