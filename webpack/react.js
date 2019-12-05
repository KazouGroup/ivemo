const mix = require('laravel-mix');

module.exports = output => {

    const path_from = './resources/js/reactjs';

    mix.react(path_from + '/app.js', output + '/js/reactjs')
        .react(path_from + '/axios.js', output + '/js/reactjs')
        .sourceMaps();
};
