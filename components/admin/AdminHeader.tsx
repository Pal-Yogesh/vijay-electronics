"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100 flex items-center justify-between px-8 z-40">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2730]/20 focus:border-[#0C2730]/30 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-500 hover:text-[#0C2730] hover:bg-gray-50 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full" />
        </button>
        <div className="w-px h-8 bg-gray-200" />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}
