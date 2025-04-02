// personal config
const markdownPlugin = require("./config/markdown.js");
const yamlPlugin = require("./config/yaml.js");
const imagePlugin = require("./config/image.js");

// Table of content
const pluginTOC = require('@uncenter/eleventy-plugin-toc');

// Eleventy config
module.exports = async function (eleventyConfig) {

  // Base plugin helps with hosting a website in a subdirectory
  const { HtmlBasePlugin } = await import("@11ty/eleventy");

  // activate plugins
  eleventyConfig.addPlugin(markdownPlugin);
  eleventyConfig.addPlugin(yamlPlugin); 
  eleventyConfig.addPlugin(imagePlugin);
  eleventyConfig.addPlugin(HtmlBasePlugin); 

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2"], // tags (heading levels) to include
    ignoredHeadings: ["[data-toc-exclude]"], // headings to ignore (list of selectors)
    ignoredElements: [], // elements (within the headings) to ignore when generating the TOC (list of selectors)
    ul: true, // whether to a use a `ul` or `ol`
    wrapper: function (toc) {
        return `${toc}`; // wrapper around the generated TOC
    },
  });

  // Copy /static files
  eleventyConfig.addPassthroughCopy("./static/css/");
  eleventyConfig.addPassthroughCopy("./static/js/");
  eleventyConfig.addPassthroughCopy("./static/img/");
  eleventyConfig.addPassthroughCopy("./static/docs/");

  // watch and reload opn CSS change
  eleventyConfig.addWatchTarget("./static/css/");

  // so that {% year %} in templates or markdown files echoes "2025"
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // sort by order function
  eleventyConfig.addFilter("sortByOrder", function(values) { 
    let vals = [...values]; // prevent mutation
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  });
  
  // go pro !
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    pathPrefix: "",
    dir: {
      input: "src",
      output: "public",
    },
  };
};
