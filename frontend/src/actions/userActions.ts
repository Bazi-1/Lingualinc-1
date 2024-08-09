/**
 * Action creator for setting the user's email.
 * @param {string} email - The email to set.
 * @returns {object} An action object with type 'SET_EMAIL' and the email as payload.
 */
export const setEmail = (email) => {
    return {
      type: 'SET_EMAIL',
      payload: email,
    };
  };
  
  /**
 * Action creator for setting the user's password.
 * @param {string} password - The password to set.
 * @returns {object} An action object with type 'SET_PASSWORD' and the password as payload.
 */
  export const setPassword = (password) => {
    return {
      type: 'SET_PASSWORD',
      payload: password,
    };
  };
  
  /**
 * Action creator for logging in a user.
 * @param {object} user - The user to log in.
 * @returns {object} An action object with type 'LOGIN_USER' and the user as payload.
 */
  export const loginUser = (user) => {
    return {
      type: 'LOGIN_USER',
      payload: user,
    };
  };
  