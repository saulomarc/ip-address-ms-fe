import axios from 'axios'
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '@/stores/alert';
import router from '@/router';

const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE
})

instance.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token;
        const session_id = useAuthStore().sessionId;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['X-Session-ID'] = session_id;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {
        if (error.response && error.status === 401) {
            if (error.response.data.error == 'Token has expired') {
                try {
                    // access refresh route to get a refreshed token
                    const { data } = await instance.post(`refresh`);
                    const newToken = data.access_token;
    
                    //set the new token in the auth store for global use
                    useAuthStore().token = data.access_token;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    error.config.headers['Authorization'] = `Bearer ${newToken}`;
                    return axios.request(error.config);
                } catch (e) {
                    useAuthStore().unsetLoginDetails()
                }
            } else {
                useAuthStore().unsetLoginDetails()
            }
        } else if (error.response && error.status === 403) {
            useAlertStore().error("You are unauthorized to perform this action")
            router.push({ name: 'unauthorized'})
        } else if (error.response && error.status === 404) {
            useAlertStore().error("Resource not found")
            router.push({ name: 'not-found'})
        } else if (error.status != 500) {
            useAlertStore().error(error.response?.data.error)
        }
        return Promise.reject(error);
    }
);

export default instance;