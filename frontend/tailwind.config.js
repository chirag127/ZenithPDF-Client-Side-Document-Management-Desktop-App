/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3B82F6",
                secondary: "#10B981",
                accent: "#F59E0B",
                background: "#F3F4F6",
                text: "#1F2937",
                error: "#EF4444",
                success: "#10B981",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
