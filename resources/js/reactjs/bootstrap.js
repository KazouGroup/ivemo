window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

//import Auth from './api/auth'

//window.$auth = new Auth(window.dataIvemo.use);

//console.log($auth);

window.$userIvemo =  window.userIvemo.user;
window.$guest = window.userIvemo.guest;
window.$url_site = window.userIvemo.url_site;
window.$country = window.userIvemo.country;
window.$country_sigle = window.userIvemo.country_sigle;
window.$name_site = window.userIvemo.name_site;
window.$phone_number = window.userIvemo.phone_number;
window.$authcheck = window.userIvemo.authcheck;



//console.log(window.bus);
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

//import Echo from 'laravel-echo';

//window.Pusher = require('pusher-js');

//window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'd9e3bf7c67f6c22c7f0f',
//     cluster: 'eu',
     //key: process.env.MIX_PUSHER_APP_KEY,
     //encrypted: true,
     //broadcaster: 'socket.io',
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     disableStats: true,
// });
