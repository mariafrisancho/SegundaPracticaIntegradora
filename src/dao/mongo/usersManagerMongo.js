import { usersModel } from "./models/users.model.js";

export class usersManagerMongo{
    constructor(){
        this.model = usersModel;
    };

    // buscar  usuario por userID
    async getUserbyid(userId){
        try {
            const result = await this.model.findById(userId).lean();
            if(!result){
                throw new Error("No se encontro el usuario");

            }
       
            return result;
        } catch (error) {
            console.log("getUserbyid",error.message);
            throw new Error("Se produjo un error obteniendo un usuario");
        }
    };

        // buscar  usuario por Email
        async getUserbyEmail(userEmail){
            try {
                const result = await this.model.findOne({email:userEmail});
                       
                return result;
            } catch (error) {
                console.log("getUserbyEmail",error.message);
                throw new Error("Se produjo un error obteniendo un usuario");
            }
        };

    // Crear usuario

    async signupUser(userinfo){
        try {
            const userEmail =userinfo.email
           
            const result= await this.model.create(userinfo);
            
            return result;
          
            
        } catch (error) {
            console.log("signupUser",error.message);
            throw new Error("No se pudo crear el usuario");
            
        }
       

    };


    // login user

    async loginUser(logininfo){
        try {
           const user= await this.model.findOne({email:logininfo.email});
           return user;
            
        } catch (error) {
            console.log("loginUser",error.message);
            throw new Error("No se pudo iniciar session para el usuario");
            
        }
       

    };



  


    




}