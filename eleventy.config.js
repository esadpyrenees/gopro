
const markdownPlugin = require("./config/markdown.js");
const yamlPlugin = require("./config/yaml.js");
const pluginTOC = require('@uncenter/eleventy-plugin-toc');
const imagePlugin = require("./config/image.js");

module.exports = async function (eleventyConfig) {

  eleventyConfig.addPlugin(markdownPlugin);
  const { RenderPlugin, HtmlBasePlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPlugin(yamlPlugin); 
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(imagePlugin); 

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2"], // tags (heading levels) to include
    ignoredHeadings: ["[data-toc-exclude]"], // headings to ignore (list of selectors)
    ignoredElements: [], // elements (within the headings) to ignore when generating the TOC (list of selectors)
    ul: true, // whether to a use a `ul` or `ol`
    wrapper: function (toc) {
        // wrapper around the generated TOC
        return `${toc}`;
    },
  });

  eleventyConfig.addPassthroughCopy("./static/css/");
  eleventyConfig.addPassthroughCopy("./static/js/");
  eleventyConfig.addPassthroughCopy("./static/img/");
  eleventyConfig.addWatchTarget("./static/css/");
  eleventyConfig.addPassthroughCopy("./static/docs/");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // sort by order
  eleventyConfig.addFilter("sortByOrder", function(values) { 
    let vals = [...values]; // prevent mutation
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  });
  

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
