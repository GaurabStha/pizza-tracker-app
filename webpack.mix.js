let mix = require('laravel-mix');

mix.js('resources/js/index.js', 'public/js/index.js').sass('resources/scss/app.scss', 'public/css/app.css');