"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/dashboard" },
        { name: "Clients", href: "/dashboard/clients" },
        { name: "Projects", href: "/dashboard/projects" },
        { name: "Invoices", href: "/dashboard/invoices" },
        { name: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-indigo-600">Command Center</h1>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-6 py-3 text-sm font-medium ${pathname === item.href
                                    ? "text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600"
                                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="block w-full text-left px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 mt-10"
                    >
                        Sign Out
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow">
                    <div className="px-8 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {navItems.find((i) => i.href === pathname)?.name || "Dashboard"}
                        </h2>
                    </div>
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
}
