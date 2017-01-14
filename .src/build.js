var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var moment = require('moment');
moment.locale('de');

var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

handlebars.registerHelper('moment', function(time,format){
  return moment(time).format(format);
});

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
  pages: {
    pattern: 'pages/**/*.md',
    sortBy: 'name',
    reverse: false
  },
}))
.use(markdown({
}))
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
.use(serve({
  port: 8080,
  host: "0.0.0.0",
  verbose: true
}))
.use(watch({
  paths: {
    "./files/**/*": true,
    "./layouts/**/*": "**/*",
  },
  // log: function(...args) { console.log("watchlog", args)}
}))
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('ChaosBlog built!');
  }
});