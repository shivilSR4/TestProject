const { alias, configPaths } = require('react-app-rewire-alias');

console.log('Config paths:', configPaths('./jsconfig.json')); // Add this line to debug

module.exports = function override(config) {
  alias(configPaths('./jsconfig.json'))(config);
  return config;
};
