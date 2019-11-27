const mix = require('laravel-mix');
const compile_react = require('./webpack/react');
//const compile_vue = require('./webpack/vuejs');


const output = 'public';
compile_react(output);
//compile_vue(output);



if (mix.inProduction()) {
    mix.version();
}


