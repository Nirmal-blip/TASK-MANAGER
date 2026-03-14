import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, CheckCircle } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Clear the session on the backend
      await API.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      // Fallback: navigate even if the API call fails
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Brand */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
              <CheckCircle className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Task<span className="text-indigo-600">Flow</span>
            </h1>
          </Link>

          {/* User Actions */}
          <div className="flex items-center gap-6">
            <span className="hidden sm:block text-sm font-medium text-slate-500">
              Personal Workspace
            </span>
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}