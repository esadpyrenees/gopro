const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItSup = require('markdown-it-sup');
const markdownItMark = require('markdown-it-mark');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItContainer = require('markdown-it-container');
const markdownItFigures = require('markdown-it-image-figures');

// Markdown configuration with way-too-much plugins

module.exports = function(eleventyConfig) {
	// Markdown config
  let options = {
		html: true,
		breaks: true,
		linkify: false,
    typographer: true
	};
  var md = markdownIt(options);
  
  // letzgo
	md
    .use(markdownItAbbr)
    .use(markdownItSup)
    .use(markdownItMark)
    .use(markdownItAnchor)
    .use(markdownItContainer, 'big')
    .use(markdownItContainer, 'gridlist')
    .use(markdownItContainer, 'scrollables') 
    .use(markdownItContainer, 'game') 
    .use(markdownItContainer, 'details', {
      validate: function(params) {
        return params.trim().match(/^details\s+(.*)$/);
      },    
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^details\s+(.*)$/);    
        if (tokens[idx].nesting === 1) {
          return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
        } else {
          return '</details>\n';
        }
      }
    })
    .use(markdownItFootnote)
    .use(markdownItFigures,{
      dataType: false,  // <figure data-type="image">, default: false
      figcaption: true,  // <figcaption>alternative text</figcaption>, default: false
      keepAlt: true, // <img alt="alt text" .../><figcaption>alt text</figcaption>, default: false
      lazyLoading: true, // <img loading="lazy" ...>, default: false
      link: false, // <a href="img.png"><img src="img.png"></a>, default: false
      tabindex: false, // <figure tabindex="1+n">..., default: false
    })
    .use(markdownItAttrs,{
      allowedAttributes: ['id', 'class']
    });

  eleventyConfig.setLibrary("md", md)


}
