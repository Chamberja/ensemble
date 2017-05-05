const gulp = require('gulp');
const boltTasks = require('@bedegaming/bolt-tasks');
const tasks = boltTasks.sinfonietta;
const haf = require('connect-history-api-fallback');

/**
 * Custom Tasks
 */
gulp.task('copy', () => gulp.src([
  './config/settings.js',
  './src/resources/manifest.json'
]).pipe(gulp.dest('./dist/assets/')));

boltTasks.GuideTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    guide: {
      src: '/node_modules/@bedegaming/bolt/src/styleguide',
      dest: '/dist/guide'
    }
  };
};
gulp.registry(new boltTasks.GuideTasksRegistry());


/**
 * Common Tasks
 */
tasks.CommonTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    clean: {
      files: ['dist']
    }
  };
};
gulp.registry(new tasks.CommonTasksRegistry());

/**
 * Script Tasks
 */
gulp.registry(new boltTasks.ScriptTasksRegistry());
gulp.registry(new boltTasks.ContentTasksRegistry());

/**
 * Font Tasks
 */
tasks.FontTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    fonts: {
      src: './src/resources/fonts/**/*.woff',
      dest: './dist/assets/fonts/',
      cssFilename: 'main.css'
    }
  };
};
gulp.registry(new tasks.FontTasksRegistry());

/**
 * Html Tasks
 */
gulp.registry(new boltTasks.HtmlTasksRegistry());

/**
 * Image Tasks
 */
gulp.registry(new boltTasks.ImageTasksRegistry());
gulp.registry(new boltTasks.IconTasksRegistry());
gulp.registry(new boltTasks.CompressTasksRegistry());

/**
 * Linting Tasks
 */
tasks.LintTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    lintSass: {
      ignoreFiles: [
        '!./src/styles/helpers/_sprite.scss'
      ]
    }
  };
};
gulp.registry(new tasks.LintTasksRegistry());


/**
 * Test Tasks
 */
boltTasks.IstanbulTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    src: [
      `${process.cwd()}/src/**/*.js`,
      `${process.cwd()}/main.js`
    ]
  };
};
gulp.registry(new boltTasks.IstanbulTasksRegistry());
gulp.registry(new boltTasks.MochaTasksRegistry());
gulp.registry(new boltTasks.NightwatchTasksRegistry());

/**
 * Server Tasks
 */
tasks.ServerTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    browserSync: {
      server: {
        baseDir: 'dist',
        index: '/index.html'
      },
      middleware: [haf()]
    }
  };
};
gulp.registry(new tasks.ServerTasksRegistry());

/**
 * Style Tasks
 */
gulp.registry(new boltTasks.StyleTasksRegistry());

/**
 * Watch Tasks
 */
tasks.WatchTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    watch: {
      scripts: [
        './config/settings.js',
        './src/**/*.js',
        './main.js',
        './node_modules/@bedegaming/bolt/src/**/*.js',
        './src/**/*.hbs',
        './node_modules/@bedegaming/bolt/src/**/*.hbs'
      ],
      styles: [
        './node_modules/@bedegaming/bolt/src/**/*.scss',
        './src/**/*.scss',
        '!./src/styles/inline/main.scss'
      ],
      html: [
        './src/*.html',
        './src/styles/inline/*.scss'
      ],
      base64: [
        './dist/stylesheets/**/*.css'
      ],
      images: [
        './src/assets/images/**/raw_*'
      ]
    },
    overrideConfig: true
  };
};
gulp.registry(new tasks.WatchTasksRegistry());

/**
 * Sitemap Tasks
 */
boltTasks.SitemapTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    baseUrl: 'https://www.ukcasino.com',
    useLocaleInUrl: false,
    sites: {
      en: {
        siteCode: 'ukcasino.com',
        url: 'https://www.ukcasino.com/api/v4/games?take=1000',
        hostUrl: 'https://www.ukcasino.com',
        pages: [
          'game/list',
          'games',
          'games/casino',
          'games/slots',
          'games/jackpots',
          'games/all',
          'promotions',
          '',
          'privacy-policy',
          'responsible-gambling',
          'terms-and-conditions',
          'payments'
        ]
      }
    }
  };
};
gulp.registry(new boltTasks.SitemapTasksRegistry());

/**
 * Service Worker Tasks
 */
gulp.registry(new boltTasks.ServiceWorkerCacheRegistry());

/**
 * Build
 */
gulp.registry(new boltTasks.BuildTasksRegistry());

gulp.task('default', gulp.series('build', 'server', gulp.parallel('watch', 'scripts', 'content')));
