import axios from 'axios';
const users_api="http://localhost:8080/users";

class userService{
    getUsers(){
        return axios.get(users_api);
    }
}
export default new userService();