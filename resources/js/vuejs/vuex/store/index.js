import Vuex from 'vuex';
import Vue from 'vue';
import categoriesfaqs from  './modules/faqs/categoriesfaqs';
import posts from  './modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        categoriesfaqs,
        posts
    }
})
