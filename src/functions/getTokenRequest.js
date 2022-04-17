
import qs from 'qs';
import axios from "axios";

/**
 * 
 * @returns {promise} token requested to API
 */

 export async function getToken() {
    const endPointApiToken = 'https://spotifiubyfy-users.herokuapp.com/token'
    var data = qs.stringify({
      'password': 'admin',
      'username': 'admin_roman'
    });
    var config = {
      method: 'post',
      url: endPointApiToken,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };
    return await axios(config)
  };
