/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                foreground: "#171724",
                background: "#ffffff",
                subtext: "#7E7E7E",
                imageground: "#F3F3F3",
                brand: {
                    primary: "#A60006",
                    primaryHover: "#E01D25",
                    dark: "#121212",
                },

                text: {
                    heading: "#050B16",
                    body: "#4B4B63",
                    muted: "#242424",
                    list: "#364151"
                },

                neutral: {
                    100: "#F3F3F6",
                    600: "#4B4B63",
                },

                blue: {
                    50: "#EEFDFD",
                    900: "#1E4D5B",
                },
            },

            fontFamily: {
                display: ["Actor", "sans-serif"],
                nav: ["Plus Jakarta Sans", "sans-serif"],
                heading: ["var(--font-heading)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
                dm: ["var(--font-dm)", "sans-serif"],
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                poppins: ["var(--font-poppins)", "sans-serif"],
                onest: ["var(--font-onest)", "sans-serif"],
            },

            borderRadius: {
                xs: "4px",
                s:"6px",
                sm: "8px",
                md: "16px",
                lg: "20px",
                pill: "48px",
            },

            boxShadow: {
                header:
                    "0px 36px 36px rgba(194,194,194,0.09), 0px 9px 20px rgba(194,194,194,0.1)",
                card: "0px 12px 24px rgba(0,0,0,0.08)",
            },

            spacing: {
                section: "120px",
                container: "80px",
            },
        },
    },
    plugins: [],
};
