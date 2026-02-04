import React from 'react';
import ThemeToggle from './ui/ThemeToggle'; // Assuming it exists, if not we move it later
// Actually ThemeToggle is in ../components/ui/ThemeToggle according to ViewFile earlier? 
// No, user metadata says `src/components/ui/ThemeToggle.jsx`. Wait, view_file says it was in `src/components/ui/ThemeToggle`?
// Let's check `Login.jsx` import: `import ThemeToggle from '../components/ui/ThemeToggle';`
// So it exists.

const Layout = ({ children, showThemeToggle = false }) => {
    return (
        <div className="min-h-screen w-full bg-[var(--bg-background)] text-[var(--text-primary)] transition-colors duration-300 font-sans selection:bg-[var(--primary-color)] selection:text-white">
            {/* Background Gradients/Mesh - Subtle & Premium */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen dark:bg-indigo-500/10 animate-pulse-slow" />
                <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[100px] mix-blend-multiply dark:mix-blend-screen dark:bg-blue-500/10 animate-pulse-slow delay-1000" />
            </div>

            <div className="relative z-10 w-full">
                {showThemeToggle && (
                    <div className="absolute top-6 right-6 z-50">
                        <ThemeToggle />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Layout;
