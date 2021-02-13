import axios from 'axios';
import authHeader from './authHeader';
import exerciceService from './ExerciceService'
const API_URL = 'http://localhost:8080/seances';
 class seanceService{
     addSeanceWithExo(jour,desc,duration1,duration2,contenu1,contenu2,id){
      return axios.post('http://localhost:8080/planning'+"/"+id+"/seances",{
        jour:jour,
         description:desc
     }, { headers: authHeader() }).then(reponse=>{
         console.log("hi");
         console.log(reponse);
        exerciceService.addExercice(duration1,duration2,contenu1,contenu2,id);
      });
     }


     addSeance(jour,description,id){
        return axios.post('http://localhost:8080/planning'+"/"+id+"/seances",{
            jour,
             description
         }, { headers: authHeader() });
     }
     changeSeance(jour,description,id){
        return axios.put('http://localhost:8080/planning'+"/"+id+"/seances",{
            jour,
             description
         }, { headers: authHeader() });
     }

     deleteSeance(id){
        return axios.delete('http://localhost:8080/planning'+"/"+id+"/seances", { headers: authHeader() });
     }
     }
     export default new seanceService();
