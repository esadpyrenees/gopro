const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "css,html,md",
		// Add any other Image utility options here:
		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],
		// optional, output image widths
		widths: ["800", "400"],
		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			sizes: "auto",
			loading: "lazy",
			// decoding: "async",
		},
		sharpOptions: {
			animated: true,
		},
	});
}