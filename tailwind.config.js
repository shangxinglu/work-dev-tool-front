const unit = "px";
function createTemp(start, end, step = 1) {
  const temp = {};
  for (let i = start; i <= end; i += step) {
    temp[i] = `${i}${unit}`;
  }

  return temp;
}

const temp = createTemp(0, 60);

const weightTemp = createTemp(100, 1000, 100);

const marginTemp = Object.assign({ auto: "auto" }, temp);
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    padding: marginTemp,
    margin: marginTemp,
    borderRadius: temp,
    fontSize: temp,
    extend: {
      colors: {
        main: "#FD7125",
        blue: "#2665FA",
        green: "#21D389",
        grey: "#5B6775",
        black: "#1F1F1F",
        red: "#FF2659",
        orange: "#FD7125",

        num: {
          blue: "#2665FA",
          red: "#FF2659",
        },
        text: {
          grey: "#5B6775",
          black: "#1F1F1F",
          blue: "#2665FA",
        },
       
        neutral: {
          3: "#333333",
          6: "#666666",
          9: "#999999",
          d: "#DDDDDD",
          '4d':'#f4f4f4'
        },
      },
      fontWeight: weightTemp,
    },
  },
  // ...
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
