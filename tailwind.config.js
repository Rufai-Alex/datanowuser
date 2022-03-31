module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          orange: "var(--primary-color)",
          black: "var(--secondary-color)",
          gray: "#838383",
        },
        secondary: {
          green: " #64C9CF",
          red: "#FF6B6B",
          dark_green: "#5DBD72",
          blue: "#64C9CF26",
          black: "#11052C",
        },
      },
      height: {
        h90: "calc(100vh - 3.2rem)",
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
      },

      ringWidth: ["active"],
      gridTemplateColumns: {
        maincolumns: "20px repeat(4, minmax(min-content, 1fr) 20px)",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
