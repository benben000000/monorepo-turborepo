"use client";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Client Detail</h1>
            <p>Viewing client ID: {params.id}</p>
            {/* Fetch and display details + projects here */}
        </div>
    );
}
