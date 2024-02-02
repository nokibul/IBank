const reset = '\x1b[0m';

const colorize = (text, colorCode) => `${colorCode}${text}${reset}`;

const error = text => colorize(text, '\x1b[31m');
const green = text => colorize(text, '\x1b[32m');

function logError(text){
  console.log(error(text));
}
function logGreen(text){
  console.log(green(text));
}

module.exports = {
  error,
  green,
};
