"use client";

import { useEffect, useState } from "react";
import {
  Package, ShoppingCart, Users, TrendingUp, ArrowUpRight,
  Plus, Eye, FileUp, BarChart3, Clock,
} from "lucide-react";
import Link from "next/link";

interface Stats {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  categories: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, activeProducts: 0, outOfStock: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok) {
          const products = data.products || [];
          const cats = new Set(products.map((p: any) => p.category));
          setStats({
            totalProducts: products.length,
            activeProducts: products.filter((p: any) => p.isActive).length,
            outOfStock: products.filter((p: any) => p.stock === 0).length,
            categories: cats.size,
          });
        }
      } catch (e) {
        console.error("Failed to fetch stats", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package, color: "bg-[#0C2730]" },
    { title: "Active Products", value: stats.activeProducts, icon: Eye, color: "bg-teal-600" },
    { title: "Out of Stock", value: stats.outOfStock, icon: ShoppingCart, color: "bg-red-500" },
    { title: "Categories", value: stats.categories, icon: BarChart3, color: "bg-[#14404B]" },
  ];

  const quickActions = [
    { title: "Add Product", desc: "Add a single product manually", href: "/admin/products/add", icon: Plus, color: "text-[#0C2730]", bg: "bg-[#0C2730]/5 hover:bg-[#0C2730]/10" },
    { title: "Bulk Upload", desc: "Upload products via Excel", href: "/admin/products/upload", icon: FileUp, color: "text-teal-600", bg: "bg-teal-50 hover:bg-teal-100" },
    { title: "View Products", desc: "Manage your inventory", href: "/admin/products", icon: Package, color: "text-[#14404B]", bg: "bg-[#14404B]/5 hover:bg-[#14404B]/10" },
    { title: "Orders", desc: "View customer orders", href: "/admin/orders", icon: ShoppingCart, color: "text-orange-600", bg: "bg-orange-50 hover:bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-[#0C2730]">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Welcome back to Vijay Electronics Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`${s.color} p-2.5 rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium">{s.title}</p>
              <p className="text-2xl font-bold text-[#0C2730] mt-0.5">
                {loading ? <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse" /> : s.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-[#0C2730] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.title}
                href={a.href}
                className={`${a.bg} rounded-2xl p-5 transition-all group`}
              >
                <Icon className={`w-6 h-6 ${a.color} mb-3`} />
                <h3 className="font-semibold text-[#0C2730] text-sm group-hover:underline">{a.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{a.desc}</p>
                <ArrowUpRight className={`w-4 h-4 ${a.color} mt-3 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#0C2730] mb-4">Recent Activity</h2>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Clock className="w-10 h-10 mb-3 text-gray-300" />
          <p className="text-sm">No recent activity yet</p>
          <p className="text-xs text-gray-400 mt-1">Activity will appear here as you manage products and orders</p>
        </div>
      </div>
    </div>
  );
}
