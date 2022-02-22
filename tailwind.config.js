module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moderateblue: "hsl(238, 40%, 52%)",
        softRed: "hsl(358, 79%, 66%)",
        lightgrayishblue: "hsl(239, 57%, 85%)",
        palered: "hsl(357, 100%, 86%)",
        darkblue: "hsl(212, 24%, 26%)",
        grayishBlue: "hsl(211, 10%, 45%)",
        lightgray: "hsl(223, 19%, 93%)",
        verylightgray: "hsl(228, 33%, 97%)",
        white: "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        main: "'Rubik', sans-serif;",
      }
    },
  },
  plugins: [],
}
