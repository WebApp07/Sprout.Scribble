import { auth } from "@/server/auth";
import { BarChart, Package, PenSquare, Settings, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const userLinks = [
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <Truck size={16} />,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={16} />,
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <Truck size={16} />,
    },
  ] as const;

  const adminLinks =
    session?.user.role === "admin"
      ? [
          {
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: <BarChart size={16} />,
          },
          {
            label: "Create",
            path: "/dashboard/add-product",
            icon: <PenSquare size={16} />,
          },
          {
            label: "Products",
            path: "/dashboard/products",
            icon: <Package size={16} />,
          },
        ]
      : [];

  const allLinks = [...adminLinks, ...userLinks];
  return (
    <div>
      <nav className="py-2:overflow-auto">
        <ul>
          {allLinks.map((link) => (
            <li>
              <Link href={link.path}>
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <h1>Layout</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
