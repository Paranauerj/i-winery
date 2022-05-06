import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WineInteraction } from '../classes/wine-interaction';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WineService {

  public moves = ["Fermentação", "Prensagem", "Transfega", "Adicionar ao Barril", "Movimentar Barril", "Tirar do Barril", "Colheita"];
  public containers = ["Tanque de Aço", "Barril de Madeira", "Garrafa", "Ovo de Cimento", "Outro"];

  constructor(private firestore: AngularFirestore, private authService: AuthService, private http: HttpClient) { }

  public getInfo(wineId){
    return this.firestore.collection("wines").doc(wineId).get();

    /*return new Promise((resolve, reject) => {
      resolve({
        id: wineId,
        name: "Vinho do João",
        year: 2000,
        type: "do Porto",
        country: "Portugal",
        producer: "João",
        image: null
      });
    });*/

  }

  public getInteractions(wineId){
    return this.http.get(environment.blockchain.url + "/wines/" + wineId);
  }

  public addInteraction(data){
    let reqHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("x-api-key", environment.blockchain.apiKey);

    return this.http.post(environment.blockchain.url + "/wines/interactions", data, {headers: reqHeaders});
  }

  public evaluate(wineId, stars){
    return this.firestore.collection("ratings").add({
      userId: this.authService.getUserId(),
      wineId: wineId,
      stars: stars
    });
  }

  public userEvaluation(wineId) {
    return this.firestore.collection("ratings").ref.where("userId","==",this.authService.getUserId()).where("wineId","==",wineId).get();
  }

  public allUserEvaluation() {
    return this.firestore.collection("ratings").ref.where("userId","==",this.authService.getUserId()).get();
  }

  public updateEvaluation(evaluationId, wineId, stars){
    return this.firestore.collection("ratings").doc(evaluationId).update({
      userId: this.authService.getUserId(),
      wineId: wineId,
      stars: stars
    });
  }

  

}
