const reset = '\x1b[0m';

const colorize = (text, colorCode) => `${colorCode}${text}${reset}`;

module.exports = {
  error: text => colorize(text, '\x1b[31m'),
  green: text => colorize(text, '\x1b[32m'),
};
