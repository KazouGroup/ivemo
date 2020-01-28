import axios from 'axios';

export default {

    userShow(username) {
        return axios.get(`/api/dashboard/profile/${username}`);
    },
    userID(id) {
        return axios.get(`/dashboard/users/${id}`);
    },
    profileID(id) {
        return axios.get(`/profiles/u/${id}`);
    },
    category(id) {
        return axios.get(`/dashboard/categories/${id}`);
    },
    /* Ici c'est pour voir l'info avec l'id elle va avec
    public function show()
    {}
    dans le controller
    */
    tag(id) {
        return axios.get(`/dashboard/tags/${id}`);
    },
    /* Ici c'est pour recuper un produit */
    tagView(tag) {
        return axios.get(`/dashboard/tags/api/${tag}`);
    },

    contactshow(contact) {
        return axios.get(`/dashboard/contacts/view/${contact}`);
    },

    aboutID(id) {
        return axios.get(`/dashboard/abouts/${id}`);
    },
    faqID(id) {
        return axios.get(`/dashboard/faqs/${id}`);
    },
    faqByCatagory(categoryfaq) {
        return axios.get(`/api/faqs/c/${categoryfaq}`);
    },
    conditionID(id) {
        return axios.get(`/dashboard/conditions/${id}`);
    },
    legalnoticeID(id) {
        return axios.get(`/dashboard/legal_notice/${id}`);
    },
    legalnoticeView(id) {
        return axios.get(`/dashboard/legal_notice/view/${id}`);
    },
    policyprivacyID(id) {
        return axios.get(`/dashboard/policy_privacy/${id}`);
    },
    policyprivacyView(policyprivacy) {
        return axios.get(`/dashboard/policy_privacy/view/${policyprivacy}`);
    },
    licencesiteID(id) {
        return axios.get(`/dashboard/licence_site/${id}`);
    },
    licencesiteView(licencesite) {
        return axios.get(`/dashboard/licence_site/view/${licencesite}`);
    },
    conditionSlug(condition) {
        return axios.get(`/dashboard/conditions/view/${condition}`);
    },
    messageshow(message) {
        return axios.get(`/dashboard/messages/view/${message}`);
    },
    tasksbyuser(username) {
        return axios.get(`/api/dashboard/tasks/u/${username}`);
    },
    technicianID(id) {
        return axios.get(`/dashboard/technicians/${id}`);
    },
    technicianSlug(technician) {
        return axios.get(`/api/technicians/p/${technician}`);
    },
    technicianCity(city) {
        return axios.get(`/api/technicians/c/${city}`);
    },
    technicianOccupation(occupation) {
        return axios.get(`/api/technicians/o/${occupation}`);
    },
    followerUsername(username) {
        return axios.get(`/followers/${username}`);
    },
    followingUsername(username) {
        return axios.get(`/followings/${username}`);
    },
};
