import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { FundoRequest } from '../model/request/fundo-request';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AcaoRequest } from '../model/request/acao-request';
import { Usuario } from '../model/usuario/usuario';
import { TesouroRequest } from '../model/request/tesouro-request';
import { getCountFromServer, getFirestore, collection } from 'firebase/firestore';
//provideDatabase,getDatabase
@Injectable({
  providedIn: 'root'
})
export class InvestService {
  url = 'http://localhost:3000/Fundos';
  public listagem: any;
  public listagem2: any;
  public listagem3: any;
  constructor(
    private httpClient: HttpClient, 
    private fireService: AngularFirestore,
    ){}
 async getTotalUsers1(){
      const firestore = getFirestore();
      const userCollectionReference = collection(firestore, "Fundo");
      const userCollectionSnapshot = await getCountFromServer(userCollectionReference);
      return userCollectionSnapshot.data().count;
}
async getTotalUsers2(){
  const firestore = getFirestore();
  const userCollectionReference = collection(firestore, "Acao");
  const userCollectionSnapshot = await getCountFromServer(userCollectionReference);
  return userCollectionSnapshot.data().count;
} 
async getTotalUsers3(){
  const firestore = getFirestore();
  const userCollectionReference = collection(firestore, "Tesouro");
  const userCollectionSnapshot = await getCountFromServer(userCollectionReference);
  return userCollectionSnapshot.data().count;
}     

// SERVICES FUNDOS IMOBILIARIOS
createTodo(todo:FundoRequest){
  todo.id = this.fireService.createId();
  return this.fireService.collection('Fundo').doc(todo.id).set(todo, {merge:true})
}
list(){
  this.listagem = this.fireService.collection('Fundo').valueChanges();
}
delete(id:string){
 return this.fireService.collection('Fundo').doc(id).delete();
}
update(todo:FundoRequest){
  todo.id === undefined ? this.fireService.createId(): todo.id = todo.id 
  return this.fireService.collection('Fundo').doc(todo.id).set(todo, {merge:true})
}

// SERVICES ACOES
createAcao(todo:AcaoRequest){
  todo.id = this.fireService.createId();
  return this.fireService.collection('Acao').doc(todo.id).set(todo, {merge:true})
}
listAcao(){
  this.listagem2 = this.fireService.collection('Acao').valueChanges();
}
deleteAcao(id:string){
 return this.fireService.collection('Acao').doc(id).delete();
}
updateAcao(todo:AcaoRequest){
  todo.id === undefined ? this.fireService.createId(): todo.id = todo.id 
  return this.fireService.collection('Acao').doc(todo.id).set(todo, {merge:true})
}

// TESOURO DIRETO
createTesouro(todo:TesouroRequest){
  todo.id = this.fireService.createId();
  return this.fireService.collection('Tesouro').doc(todo.id).set(todo, {merge:true})
}
listTesouro(){
  this.listagem3 = this.fireService.collection('Tesouro').valueChanges();
}
updateTesouro(todo:TesouroRequest){
  todo.id === undefined ? this.fireService.createId(): todo.id = todo.id 
  return this.fireService.collection('Tesouro').doc(todo.id).set(todo, {merge:true})
}
deleteTesouro(id:string){
  return this.fireService.collection('Tesouro').doc(id).delete();
 }



 //BUSCA
 filterBy(categoriaToFilter: string, select:string) {

  if(select === '1'){
    let avisos = this.fireService.collection('Fundo', ref => ref.where('nome','==', categoriaToFilter )).valueChanges()
    this.listagem = avisos
    return  this.listagem;

  }
  if(select === '2'){
    let avisos = this.fireService.collection('Acao', ref => ref.where('nome','==', categoriaToFilter )).valueChanges()
    this.listagem2 = avisos
    
    return  this.listagem2;
    
  }
  if(select === '3'){
    let avisos = this.fireService.collection('Tesouro', ref => ref.where('modalidade','==', categoriaToFilter )).valueChanges()
    this.listagem3 = avisos
    return  this.listagem3;
    
  }

};



} 



 




