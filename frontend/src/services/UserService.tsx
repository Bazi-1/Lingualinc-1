import { getToken } from "../utils/localStorageUtils.ts";
import http from "../utils/http-common.ts";

const getAll = () =>{
    return http.get(`/auth/users`, {
        
    });
}

const authenticate = (user) => 
{
    return http.post(`/auth/login`, user);
}


const register = (user) => {
    return http.post(`/auth/register`, user);
}

const getUserProfilePic = (userId) => {
   
    return http.get(`/auth/user-profile-pic/${userId}`,
    {

        headers: {
            Authorization: `Bearer ${getToken()}`
        }}
    
    
    );
};

/**
 * Service methods for user-related operations.
 */
const UserService = {
    getAll,
    authenticate,
    register,
    getUserProfilePic
}

export default UserService;