import axios from 'axios';
import AuthService from './authService';

const API_URL = 'http://localhost:8080/coachs';
class CoachService{
    getcurrentCoach(){
        return AuthService.getCurrentUser().user;
    }
}




export default new CoachService();