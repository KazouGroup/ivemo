const mix = require('laravel-mix');
const compile_react = require('./webpack/react');
const compile_vue = require('./webpack/vuejs');
const compile_premium = require('./webpack/premium');


const output = 'public';
compile_react(output);
compile_vue(output);
compile_premium(output);



if (mix.inProduction()) {
    mix.version();
}


