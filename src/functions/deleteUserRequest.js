import axios from "axios";

/**
 * 
 * @returns {promise} result of deleting user
 */

 export async function deleteUser(user_id, authorization) {
    const endPointApiToken = 'https://spotifiubyfy-users.herokuapp.com/users/' + user_id;
    var config = {
      method: 'delete',
      url: endPointApiToken,
      headers: {
        'Authorization': authorization 
      }
    };
    return await axios(config)
  };