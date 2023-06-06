import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { Login } from "../model/login";
import { User } from "../model/usuario/user";
import { Usuario } from "../model/usuario/usuario";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    public userId:string;
    userEmail:string;
    constructor( private afa: AngularFireAuth, private afs: AngularFirestore){  
    }
    userLogado(){
     return this.afa.authState.subscribe((user) =>{
        if(user?.uid){
            this.userId = user?.uid;
            this.userEmail = user?.email;
        }else{
            this.userId = '';
        }
        
     })

    }
    login(login:Login){
       return this.afa.signInWithEmailAndPassword(login.email, login.password);
    }
    logout(){
        return this.afa.signOut();
    }
    signUp(user:Usuario){
        return this.afa.createUserWithEmailAndPassword(user.email, user.password).then((result) =>{
            console.log('cadastro realizado com sucesso', result);
        }).catch((e) =>{
            console.log('falha no cadastro', e);
        })
    }
    forgotPassword(passwordResetEmail:string){
        return this.afa.sendPasswordResetEmail(passwordResetEmail)
        .then(() =>{
            console.log('Password reset email sent, check your inbox.');
        }). catch((error) =>{
            console.log(error)
        })
    }





}