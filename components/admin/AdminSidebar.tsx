"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  BarChart3, Tag, FileText, FileUp,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Add Product", href: "/admin/products/add", icon: Tag },
  { title: "Bulk Upload", href: "/admin/products/upload", icon: FileUp },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", href: "/admin/customers", icon: Users },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { title: "Reports", href: "/admin/reports", icon: FileText },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0C2730] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image
            src="/vijayelectronicslogo.png"
            alt="Vijay Electronics"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg bg-white"
          />
          <div>
            <h1 className="text-lg font-bold leading-tight">Vijay Electronics</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:bg-white/8 hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{item.title}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
        >
          <span>← Back to Store</span>
        </Link>
      </div>
    </aside>
  );
}
