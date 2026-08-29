import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brutal-bg bg-brutal-grid text-white overflow-x-hidden selection:bg-brutal-yellow selection:text-black">
      {/* Top ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brutal-cyan/5 blur-[120px] pointer-events-none z-0" />

      {/* Main page content stack */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Terminal />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
