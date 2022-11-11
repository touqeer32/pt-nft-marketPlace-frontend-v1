let outputColor;
let outputCode;
let hexString = "0123456789abcdef";

let randomColor = () => {
  let hexCode = "#";
  for (var i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  return hexCode;
};

let generateGrad = () => {
  let colorOne = randomColor();
  let colorTwo = randomColor();
  let angle = Math.floor(Math.random() * 360);
  outputColor = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  return outputColor;
};
module.exports = {
  generateGrad,
};
