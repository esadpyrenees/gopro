const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {  
  // accept yaml fuiles as data files
  eleventyConfig.addDataExtension("yaml, yml", (contents) =>
    yaml.load(contents),
  );
};