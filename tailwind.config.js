// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-karla)"],
        // serif: ["var(--font-spectral)"],
        // sans: ["var(--font-inter)"],
        // stack: ["'Stack Sans Text'", "sans-serif"],
      },
      colors: {
        brand: {
          matte_black: "#252A2C", 
          // navy_blue: "#09121B", 
          navy_blue: "#000c28",
          light_blue: "#2ad5e8ff",
          orange: "#EB9200",    
          pink: "#EFDEDA",
          white: "#FAFFF9",     
        }
      }
    }
  },
  plugins: [],
};