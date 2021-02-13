import axios from 'axios';
import authHeader from './authHeader';
import CoachService from './CoachService';
const API_URL = 'http://localhost:8080/equipeCoachs';
 class EquipeCService{
     addEquipeC(){
        const coach=CoachService.getcurrentCoach();
        const joueurs=null;
        const planning=null;
        return axios.post(API_URL,{
            coach:coach,
            joueurs:joueurs,
            planning:planning
        }, { headers: authHeader() });
     }

     getEquipeByCoach(coachId){
        return axios.get(API_URL+"/coach/"+coachId, { headers: authHeader() });
     }

     getEquipeById(EId){
      return axios.get(API_URL+"/"+EId, { headers: authHeader() });
     }

     

    }    



 export default new EquipeCService();