import axios from 'axios';
import authHeader from './authHeader';
import seanceService from './seanceService';
const API_URL = 'http://localhost:8080/planning';
 class planningService{
     addPlanning(week,jour,desc,duration1,duration2,contenu1,contenu2,id){
      return axios.post(API_URL,{
         week:week
     }, { headers: authHeader() }).then(reponse=>{
        seanceService.addSeanceWithExo(jour,desc,duration1,duration2,contenu1,contenu2,id);
     });
     }

     getPlannings(){
        return axios.get(API_URL, { headers: authHeader() });
     }

     getPlanning(id){
      return axios.get(API_URL+'/'+id, { headers: authHeader() });
   }

     getEquipeById(EId){
      return axios.get(API_URL+"/"+EId, { headers: authHeader() });
     }

     

    }    



 export default new planningService();