import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { ListFilter, LayoutGrid, ClipboardList, Sparkles } from "lucide-react";
import { useState } from "react";

export default function TaskList({ tasks, refresh }) {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'

  // Animation configuration for the container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This creates the "waterfall" effect
      },
    },
  };

  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200"
      >
        <div className="bg-indigo-50 p-6 rounded-full mb-4">
          <ClipboardList className="w-12 h-12 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Your list is a clean slate</h3>
        <p className="text-slate-500 max-w-xs mt-2 font-medium">
          Add your first task above to start your productive journey.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* List Header & Controls */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Your Tasks <span className="text-slate-400 font-medium ml-1">({tasks.length})</span>
          </h2>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
          >
            <ListFilter size={18} />
          </button>
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Animated Task Container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={
          viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "space-y-4"
        }
      >
        <AnimatePresence mode='popLayout'>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              refresh={refresh}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}