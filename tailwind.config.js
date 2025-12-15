/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sga: {
                    navy: '#020617', // Slate 950 base
                    card: '#0f172a', // Slate 900
                    cyan: '#06b6d4', // Cyan 500
                    green: '#22c55e', // Green 500
                    accent: '#3b82f6', // Blue 500
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                }
            },
        },
    },
    plugins: [],
}
