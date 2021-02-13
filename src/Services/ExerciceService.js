import axios from 'axios';
import authHeader from './authHeader';
const API_URL = 'http://localhost:8080/seances';
 class exerciceService{
     addExercice(duration1,duration2,contenu1,contenu2,id){
      return axios.post("http://localhost:8080/seances/"+id+"/exercice",{
        duration:duration1,
        contenu:contenu1
     }, { headers: authHeader() }).then(response=>{
         axios.post("http://localhost:8080/seances/"+id+"/exercice",  {
            duration:duration2,
            contenu:contenu2
         }, { headers: authHeader() })
     });
     }
     saveExo(duration,contenu,Sid){
        return axios.post("http://localhost:8080/seances/"+Sid+"/exercice",{
            duration,
            contenu
         }, { headers: authHeader() });
     }


     }
     export default new exerciceService();