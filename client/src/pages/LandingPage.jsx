import React, { useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float, PerspectiveCamera, Html } from "@react-three/drei";
import { 
  CheckCircle, Layout, Lock, ArrowRight, 
  ListChecks, Github, Zap, Shield, MousePointer2 
} from "lucide-react";


// --- The Dotted Grid Sphere (Y-Axis Rotation Only) ---
function DottedSphere() {
    const pointsRef = useRef();
    
    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      
      if (pointsRef.current) {
        // Rotate ONLY on Y (Globe-like spin)
        pointsRef.current.rotation.y = t * 0.2; 
        
        // Lock other axes
        pointsRef.current.rotation.x = 0;
        pointsRef.current.rotation.z = 0;
      }
    });
  
    return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <points ref={pointsRef}>
          <sphereGeometry args={[1.7, 50, 50]} />
          <pointsMaterial
            color="#6366f1"
            size={0.035}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.6}
          />
        </points>
      </Float>
    );
  }

const HeroBackground = () => (
  <div className="absolute top-0 right-0 w-full h-[500px] lg:h-screen lg:w-1/2 z-0 pointer-events-none">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <DottedSphere />
      </Suspense>
    </Canvas>
  </div>
);

// --- Content Components ---
export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
      
      {/* 1. Glass Navbar */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 px-6 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg">
              <CheckCircle className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">TaskFlow</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/register" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-12">
        <HeroBackground />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div custom={0} variants={fadeIn} className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-8">
              <Zap className="w-3 h-3 fill-current" /> v2.0 is now live
            </motion.div>
            
            <motion.h1 custom={1} variants={fadeIn} className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              The <span className="text-indigo-600">Future</span> of <br />
              Task Tracking.
            </motion.h1>

            <motion.p custom={2} variants={fadeIn} className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              A high-performance system for creators and developers. 
              Sync your life across the grid with zero latency.
            </motion.p>

            <motion.div custom={3} variants={fadeIn} className="flex flex-wrap gap-4">
              <Link to="/register" className="group px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-2xl hover:-translate-y-1">
                Start Building <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-3 px-6 py-4 text-slate-500 font-semibold cursor-help">
                <MousePointer2 className="w-5 h-5" /> 10k+ Active Users
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Feature Grid */}
      <section className="py-32 bg-white relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Engineered for Focus</h2>
            <p className="text-slate-500 font-medium">Everything you need to manage complex projects without the mental clutter.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Layout className="w-6 h-6" />, 
                title: "Grid View", 
                desc: "A clean, spatial interface that lets you see your entire week at a single glance.",
                color: "bg-blue-500"
              },
              { 
                icon: <Shield className="w-6 h-6" />, 
                title: "Safe Haven", 
                desc: "Your tasks are yours. End-to-end encryption ensures your data stays private.",
                color: "bg-indigo-500"
              },
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: "Instant Sync", 
                desc: "Built on a WebSocket backbone. Changes reflect instantly on all devices.",
                color: "bg-purple-500"
              },
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] transition-all duration-300"
              >
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          <div>
            <div className="text-5xl font-black text-indigo-400 mb-2">99.9%</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Uptime</div>
          </div>
          <div>
            <div className="text-5xl font-black text-indigo-400 mb-2">24ms</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Latency</div>
          </div>
          <div>
            <div className="text-5xl font-black text-indigo-400 mb-2">1M+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Tasks Done</div>
          </div>
          <div>
            <div className="text-5xl font-black text-indigo-400 mb-2">0</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Data Leaks</div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-32 bg-white flex justify-center px-6">
        <div className="max-w-4xl w-full bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Escape the chaos. <br/> Join the flow.</h2>
          <Link to="/register" className="inline-block px-12 py-5 bg-white text-indigo-700 font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
            Get Started for Free
          </Link>
          <p className="mt-8 text-indigo-100 font-medium opacity-80 underline cursor-pointer">No credit card required.</p>
        </div>
      </section>

      {/* 6. Simple Footer */}
      <footer className="py-16 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-indigo-600 w-5 h-5" />
            <span className="font-black text-slate-900 tracking-tighter text-xl">TaskFlow</span>
          </div>
          <div className="flex gap-10 text-slate-500 font-bold text-sm">
            <Link to="#" className="hover:text-indigo-600 transition-colors">Github</Link>
            <Link to="#" className="hover:text-indigo-600 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-indigo-600 transition-colors">Twitter</Link>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2026 TaskFlow. System Status: All Green.</p>
        </div>
      </footer>
    </div>
  );
}