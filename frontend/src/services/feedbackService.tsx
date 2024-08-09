import { getToken } from "../utils/localStorageUtils.ts";
import http from "../utils/http-common.ts";



const postfeedback = (userId,content) => {
    return http.post(`/feedback/add-feedback`, { userId, content } , {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },});
};


const displayfeedback = () => {
    return http.get(`/feedback/display-all-feedback`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

/**
 * Service methods for feedback-related operations.
 */
const feedServices = {
    postfeedback,displayfeedback
}

export default feedServices;