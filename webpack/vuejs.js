const mix = require('laravel-mix');

module.exports = output => {

    const path_from = './resources/js/vuejs';

    mix.js(path_from + '/app.js', output + '/js/vuejs')
        .js(path_from + '/axios.js', output + '/js/vuejs')
        .vue();

};
