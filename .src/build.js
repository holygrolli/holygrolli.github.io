var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');

metalsmith(__dirname)
.metadata({
  site: {
    name: 'ChaosBlog',
    description: "ChaosBlog is the blog of Andreas Groll and (chaotic) life."
  }
})
.use(collections({
  posts: {
    pattern: 'posts/**/*.md',
    sortBy: 'date',
    reverse: true
  },
}))
.use(markdown())
.use(permalinks({
      relative: false,
      pattern: ':collection/:title',
    }))
.use(layouts({
      engine: 'handlebars',
      directory: './layouts',
      default: 'post.html',
      pattern: ["*/*/*html","*/*html","*html"],
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
        }
    }))
.source('./files')
.destination('../.')
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('ChaosBlog built!');
  }
});