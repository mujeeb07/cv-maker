/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Forces 'dark' class strategy instead of system preference
    theme: {
        extend: {
            colors: {
                // Mapping Tailwind colors to our CSS variables for utility usage if needed
                background: "var(--bg-background)",
                foreground: "var(--text-primary)",
                card: "var(--bg-card)",
                "card-foreground": "var(--text-primary)",
                primary: "var(--primary-color)",
                "primary-foreground": "var(--primary-foreground)",
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
            },
            keyframes: {
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                }
            }
        },
    },
    plugins: [],
}
