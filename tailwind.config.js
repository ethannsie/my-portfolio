// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-spectral)"],
        sans: ["var(--font-inter)"],
        stack: ["'Stack Sans Text'", "sans-serif"],
      },
      colors: {
        brand: {
          matte_black: "#252A2C", 
          navy_blue: "#09121B", 
          orange: "#EB9200",    
          pink: "#EFDEDA",
          white: "#FAFFF9",     
        }
      }
    }
  },
  plugins: [],
};