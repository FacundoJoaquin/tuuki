/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ["Barriecito", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        xxs: "260px",
      
        xs: "320px",
      },
      colors: {
        mainred: {
          50: "#fcf5f4",
          100: "#fae9ea",
          200: "#f4d7d8",
          300: "#ebb6b8",
          400: "#e08c91",
          500: "#cb515c",
          600: "#ba4454",
          700: "#9c3445",
          800: "#832e3e",
          900: "#712a3a",
          950: "#3e131c",
        },

        lw: {
          50: "#f5f5f5",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
        mandy: {
          50: "#fdf3f3",
          100: "#fce4e4",
          200: "#fbcdcd",
          300: "#f7aaaa",
          400: "#ef7a7a",
          500: "#e76161",
          600: "#d13131",
          700: "#af2626",
          800: "#912323",
          900: "#792323",
          950: "#410e0e",
        },
        "beige-cool": {
          100: "#fff9ed",
          200: "#fff3da",
        },
        interfaz: {
          100: "#dadcdc",
          200: "#d0d3d4",
          300: "#b4b9b9",
          400: "#7c8485",
          500: "#444f51",
          600: "#3d4749",
          700: "#333b3d",
          800: "#292f31",
          900: "#212728",
        },
      },
    },
  },
  plugins: [],
};
