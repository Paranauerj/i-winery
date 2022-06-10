import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WineInteraction } from '../classes/wine-interaction';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WineService {

  public moves = ["Fermentação", "Prensagem", "Transfega", "Adicionar ao Barril", "Movimentar Barril", "Tirar do Barril", "Colheita"];
  public containers = ["Tanque de Aço", "Barril de Madeira", "Garrafa", "Ovo de Cimento", "Outro"];

  constructor(private firestore: AngularFirestore, private authService: AuthService, private http: HttpClient) { }

  // Obtém os dados do vinho
  public getInfo(wineId){
    return this.firestore.collection("wines").doc(wineId).get();
  }

  // Obtém os vinhos que são propriedade do utilizador
  public getOwned(){
    return this.firestore.collection("wines").ref.where("ownerId", "==", this.authService.getUserId()).get();
  }

  // Adiciona vinho a base de dados
  public addWine(data){
    return this.firestore.collection("wines").add(data);
  }

  // Remove o vinho da base de dados
  public removeWine(wineId){
    return this.firestore.collection("wines").doc(wineId).delete();
  }

  // ------------------------ INTERAÇÕES --------------------------

  // Obtém as interações do vinho e ordena-as por data
  public getInteractions(wineId){
    return this.http.get<any[]>(environment.blockchain.url + "/wines/" + wineId).pipe(

        map(arrOfInteractions => arrOfInteractions.sort((a, b) => {
          return a.Record.date >= b.Record.date ? 1 : -1;
        }))

    );
  }

  // Adiciona interação nova
  public addInteraction(data){
    let reqHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("x-api-key", environment.blockchain.apiKey);

    return this.http.post(environment.blockchain.url + "/wines/interactions", data, {headers: reqHeaders});
  }

    // Remove a interação pelo ID
  public removeInteraction(interactionId){
    let reqHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("x-api-key", environment.blockchain.apiKey);

    return this.http.delete(environment.blockchain.url + "/wines/interactions/" + interactionId, {headers: reqHeaders});
  }

  // AVALIAÇÕES
  // Avalia o vinho
  public evaluate(wineId, stars){
    return this.firestore.collection("ratings").add({
      userId: this.authService.getUserId(),
      wineId: wineId,
      stars: stars
    });
  }

  // Retorna a avaliação feita pelo user sobre determinado vinho
  public userEvaluation(wineId) {
    return this.firestore.collection("ratings").ref.where("userId","==",this.authService.getUserId()).where("wineId","==",wineId).get();
  }

  // Retorna todas as avaliações do utilizador
  public allUserEvaluation() {
    return this.firestore.collection("ratings").ref.where("userId","==",this.authService.getUserId()).get();
  }

  // Atualiza avaliação do utilizador
  public updateEvaluation(evaluationId, wineId, stars){
    return this.firestore.collection("ratings").doc(evaluationId).update({
      userId: this.authService.getUserId(),
      wineId: wineId,
      stars: stars
    });
  }

  

}
