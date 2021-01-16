import React from 'react';
import userService from '../Services/userServiceOld';


class userComponant extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        userService.getUsers().then(response =>{
            this.setState({ users : response.data});
        });
    }
    render(){
        return (
            <div>
            <h1 className="text-center">Liste des Joueurs</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Prenom</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>mot de passe</td>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        </tr>
                            )}
                    </tbody>
            </table>
            </div>
        )
    }

}
export default userComponant