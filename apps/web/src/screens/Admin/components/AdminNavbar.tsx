import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "../../../components/ui/icon";

interface NavigationItem {
  label: string;
  path: string;
}

const adminNavigationItems: NavigationItem[] = [
  {
    label: "Users",
    path: "/admin/manage-users",
  },
  {
    label: "Boats",
    path: "/admin/manage-fleets",
  },
  {
    label: "Trips",
    path: "/admin/trips",
  },
  {
    label: "Staff",
    path: "/admin/manage-staff",
  },
  {
    label: "Owners",
    path: "/admin/manage-boat-owners",
  },
];

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex items-center"
          aria-label="Go to admin dashboard"
        >
          <img
            src="/SLCG.png"
            alt="Sri Lanka Coast Guard Logo"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-7 text-xs text-slate-700">
          <button
            type="button"
            aria-label="Notifications"
            className="flex items-center justify-center transition-colors duration-300 hover:text-indigo-700"
          >
            <Icon name="notification" size={20} />
          </button>

          {adminNavigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                [
                  "transition-colors duration-300 hover:text-indigo-700",
                  isActive
                    ? "font-bold text-indigo-800"
                    : "font-medium text-slate-700",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-[#14223d] px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-[#22375f]"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;