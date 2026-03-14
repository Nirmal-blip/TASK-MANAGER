import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { motion } from "framer-motion";
import { ListTodo, CheckCircle2, Zap, LayoutGrid } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks || res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      <div className="relative z-[100]">
        <Navbar />
      </div>

      <main className="flex flex-col">
        
        {/* --- THE INDIGO COMMAND HEADER --- */}
        <div className="bg-[#4f46e5] relative z-0 overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="max-w-6xl mx-auto px-6 py-12 md:pt-20 md:pb-32 relative">
            {/* FIX: flex-col for mobile, flex-row for desktop 
               items-start ensures content doesn't stretch weirdly
            */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              
              <div className="w-full md:max-w-[60%]">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-indigo-200 mb-4"
                >
                  <LayoutGrid size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Workspace</span>
                </motion.div>
                
                {/* FIX: Responsive Font Sizes 
                   text-4xl (mobile) -> text-5xl (tablet) -> text-7xl (desktop)
                */}
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] break-words">
                  Focus <span className="text-indigo-300">Daily.</span>
                </h2>
              </div>

              {/* Stats: Improved responsiveness */}
              <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-5">
                <div className="flex w-full justify-between md:justify-end gap-8 text-white">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 opacity-60 mb-1">Efficiency</p>
                    <p className="text-2xl md:text-3xl font-bold leading-none">{progress}%</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 opacity-60 mb-1">Active</p>
                    <p className="text-2xl md:text-3xl font-bold leading-none">{tasks.length - completedCount}</p>
                  </div>
                </div>
                
                {/* Progress Bar: Full width on mobile */}
                <div className="w-full md:w-48 h-1.5 bg-indigo-900/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-indigo-300 shadow-[0_0_15px_rgba(165,180,252,0.5)]"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- THE WHITE CANVAS --- */}
        <div className="bg-white px-4 sm:px-8 -mt-10 md:-mt-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* The Floating Composer: Responsive Padding */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 bg-white rounded-2xl md:rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100 p-1 md:p-2"
            >
              <div className="bg-slate-50/50 p-1 rounded-xl md:rounded-[2.2rem]">
                <TaskForm refresh={load} />
              </div>
            </motion.div>

            {/* Content Body */}
            <div className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
              
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-10 bg-indigo-600 rounded-full"></div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <ListTodo className="text-indigo-600 w-5 h-5" /> Sprint
                  </h3>
                </div>
                
                <div className="min-h-[300px]">
                   <TaskList tasks={tasks} refresh={load} />
                </div>
              </section>

              {/* Sidebar: Responsive layout */}
              <aside className="space-y-8">
                <div className="bg-slate-50 lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">Overview</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                    <SidebarStat label="Done" value={completedCount} icon={<CheckCircle2 size={16}/>} />
                    <SidebarStat label="Total" value={tasks.length} icon={<Zap size={16}/>} />
                  </div>
                </div>
                
                <div className="p-6 bg-indigo-50 rounded-2xl md:rounded-[2rem] border border-indigo-100">
                  <p className="text-[11px] font-bold text-indigo-700 leading-relaxed">
                   Productivity Tip: Focus on the most difficult task first in your Sprint.
                  </p>
                </div>
              </aside>

            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 bg-white border-t border-slate-100 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          TaskFlow Engine // 2026
        </span>
      </footer>
    </div>
  );
}

function SidebarStat({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
        <span className="text-slate-300">{icon}</span>
        {label}
      </div>
      <span className="text-lg font-black text-slate-800">{value}</span>
    </div>
  );
}