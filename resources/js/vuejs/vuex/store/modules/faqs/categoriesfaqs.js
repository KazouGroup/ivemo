

const state = {
    categoriesfaqs:{ }
};

const getters = {
    AllCategoriesfaqs: (state) => state.categoriesfaqs,
};

const actions = {

    async getCategoriesfaqs ({ commit }){
        const response = await
            dyaxios.get(route('api.categories_faqs'));
            commit('setCategoriesfaqs', response.data);
    }

};

const mutations = {
    setCategoriesfaqs: (state, categoriesfaqs) => (state.categoriesfaqs = categoriesfaqs)
};

export default {
    state,
    getters,
    actions,
    mutations,
}
