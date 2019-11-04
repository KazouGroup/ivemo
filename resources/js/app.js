/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Index');
require('./components/routes/RoutePath ');



import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import moment from 'moment'
require("moment/min/locales.min");
moment.locale('fr');
