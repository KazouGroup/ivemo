import axios from 'axios';

const ziggyBaseUrl = Ziggy.baseUrl;

const getClient = (baseUrl = ziggyBaseUrl) => {
    // const token = global.token;
    // const is_production = dyvars.is_production;

    const options = {
        baseURL: baseUrl,
    };

    options.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    };

    let csrftoken = document.head.querySelector('meta[name="csrf-token"]');
    if(csrftoken) {
        options.headers['X-CSRF-TOKEN'] = csrftoken.content;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    if (typeof token !== 'undefined' && token !== null) {
        options.headers['Authorization'] = 'Bearer ' + token;
    }

    const client = axios.create(options);

    client.interceptors.request.use(
        requestConfig => requestConfig,
        (requestError) => {
            // Raven.captureException(requestError);
            return Promise.reject(requestError);
        },
    );

    client.interceptors.response.use(
        response => response,
        (error) => {
            // if (error.response && error.response.status >= 500) {
            //     Raven.captureException(error);
            // } else if(!error.response) {
            //     Raven.captureException('axios: response undefined');
            // }
            return Promise.reject(error);
        },
    );

    return client;
};

const client = {
    get(url, conf = {}) {
        return getClient().get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    delete(url, conf = {}) {
        return getClient().delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    head(url, conf = {}) {
        return getClient().head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    options(url, conf = {}) {
        return getClient().options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    post(url, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    put(url, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    patch(url, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },
};

window.dyaxios = client;
export default client;
