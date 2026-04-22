/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                britanica: ["Britanica", "sans-serif"],
            },
        },
    },
    plugins: [],
}