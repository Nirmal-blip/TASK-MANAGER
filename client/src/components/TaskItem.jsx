import { useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit3, Trash2, CheckCircle2, Circle, 
  Save, X, MoreVertical, Calendar 
} from "lucide-react";

export default function TaskItem({ task, refresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [isDeleting, setIsDeleting] = useState(false);

  const isCompleted = status === "completed";

  const remove = async () => {
    setIsDeleting(true);
    try {
      await API.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err) {
      setIsDeleting(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = isCompleted ? "pending" : "completed";
    setStatus(newStatus); // Optimistic UI update
    await API.put(`/tasks/${task._id}`, { ...task, status: newStatus });
    refresh();
  };

  const updateTask = async (e) => {
    e.preventDefault();
    await API.put(`/tasks/${task._id}`, { title, description, status });
    setEditing(false);
    refresh();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isDeleting ? 0 : 1, scale: 1 }}
      className={`group bg-white border ${
        isCompleted ? "border-slate-100 opacity-75" : "border-slate-200"
      } p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 mb-4`}
    >
      <AnimatePresence mode="wait">
        {editing ? (
          /* --- EDIT MODE --- */
          <motion.form
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={updateTask}
            className="space-y-3"
          >
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              autoFocus
            />
            <textarea
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-600 text-sm min-h-[80px] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <div className="flex justify-between items-center pt-2">
              <select
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">⏳ Pending</option>
                <option value="completed">✅ Completed</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                >
                  <Save size={16} /> Save
                </button>
              </div>
            </div>
          </motion.form>
        ) : (
          /* --- VIEW MODE --- */
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-4"
          >
            {/* Custom Checkbox Toggle */}
            <button
              onClick={toggleStatus}
              className={`mt-1 transition-colors ${
                isCompleted ? "text-green-500" : "text-slate-300 hover:text-indigo-400"
              }`}
            >
              {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            <div className="flex-1">
              <h3
                className={`text-lg font-bold transition-all ${
                  isCompleted ? "text-slate-400 line-through" : "text-slate-800"
                }`}
              >
                {task.title}
              </h3>
              <p className={`text-sm mt-1 leading-relaxed ${
                isCompleted ? "text-slate-300" : "text-slate-500"
              }`}>
                {task.description || "No description provided."}
              </p>
              
              <div className="flex items-center gap-4 mt-4">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                   isCompleted ? "bg-green-50 text-green-600" : "bg-indigo-50 text-indigo-600"
                 }`}>
                   {status}
                 </span>
                 <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Calendar size={12} />
                    <span>{new Date(task.createdAt || Date.now()).toLocaleDateString()}</span>
                 </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditing(true)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Edit Task"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={remove}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}