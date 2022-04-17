import axios from "axios";

export async function getUsers(auth) {
    const endPointApiUsers = 'https://spotifiubyfy-users.herokuapp.com/users?skip=0&limit=100'
    var config = {
      method: 'get',
      url: endPointApiUsers,
      headers: {
        'accept': 'application/json',
        'Authorization': auth,
        'Access-Control-Allow-Origin': 'true'
      }
    }
    return await axios(config)
};
