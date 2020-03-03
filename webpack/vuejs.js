const mix = require('laravel-mix');

module.exports = output => {

    const path_from = './resources/js/vuejs';

    mix.js(path_from + '/app.js', output + '/js/vuejs')
        .js(path_from + '/axios.js', output + '/js/' +
            '')
        .copy('node_modules/animate.css/animate.css','public/assets/vendor/assets/css')
        .sourceMaps();

};
