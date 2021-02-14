import axios from 'axios';
import authHeader from './authHeader';
import CoachService from './CoachService';
const API_URL = 'http://localhost:8080/equipeNutritionnistes';
 class EquipeNService{
     addEquipeN(){
        const nutritionniste=CoachService.getcurrentCoach();
        const joueurs=null;
        const regime=null;
        return axios.post(API_URL,{
            nutritionniste,
            joueurs,
            regime
        }, { headers: authHeader() });
     }

     getEquipeByNutri(NutriId){
        return axios.get(API_URL+"/Nutri/"+NutriId, { headers: authHeader() });
     }

     getEquipeById(EId){
      return axios.get(API_URL+"/"+EId, { headers: authHeader() });
     }

     

    }    



 export default new EquipeNService();