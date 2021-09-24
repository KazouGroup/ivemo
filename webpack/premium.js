const mix = require('laravel-mix');

module.exports = output => {

    const path_from = './resources/js/premium';

    mix.js(path_from + '/app.js', output + '/js/premium')
        .react().sourceMaps();
};