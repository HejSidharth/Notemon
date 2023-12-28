import React, { useEffect } from 'react';
import { useIdeas } from '../lib/context/codeSnip';
import { Link } from 'react-router-dom';


export default function HeroSection() {
    const ideas = useIdeas();
      return (
        <div>
          <section className="text-center mt-10 h-screen">
            <div className="container mx-auto px-6 py-16">
              <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="lg:w-1/2">
                    <code className="code">Version 1.0</code>
                  <h1 className="sm:text-6xl text-4xl font-bold leading-tight mb-4">
                    📝 Notemon 📝
                  </h1>
                  <p className="text-lg mb-8">
                    🌟 Welcome to Taskmon – where managing tasks feels like a
                    breeze! Get ready to supercharge your productivity! 🚀 Click
                    'Get Started' to start jotting down your to-dos! 📝🔥 Let's crush
                    those tasks together! 💪✨
                  </p>
                  <Link to="/dashboard" onClick={() => toast.success("Welcome!")}>
                    <button className="btn py-3 px-8 rounded-lg ">
                      Get Started! 🚀
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="fixed bottom-5 left-5">
            </div>
          </section>
          <div className="fixed bottom-5 left-5">
            </div>    
            </div>
      );
   
  
}
