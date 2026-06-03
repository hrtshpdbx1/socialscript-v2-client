// src/components/AdminLayout.jsx

import { Outlet } from "react-router"
import { AdminNav } from "./AdminNav"


function AdminLayout() {

    return (
        <div className="flex min-h-screen min-w-full">
            <AdminNav />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout