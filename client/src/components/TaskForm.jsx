import { useState } from "react";
import API from "../services/api";
import { Plus, Type, AlignLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Don't submit empty tasks

    setLoading(true);
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      refresh();
    } catch (error) {
      console.error("Failed to add task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8 transition-all hover:shadow-md"
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Title Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Type size={18} />
            </div>
            <input
              required
              placeholder="Task title..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="relative flex-[2]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <AlignLeft size={18} />
            </div>
            <input
              placeholder="Add a brief description (optional)..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 placeholder:text-slate-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading || !title.trim()}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-95 min-w-[120px]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Plus size={20} />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}