const mix = require('laravel-mix');

module.exports = output => {

    const path_from = './resources/js/reactjs';

    mix.js(path_from + '/app.js', output + '/js/reactjs')
        .react();
};
