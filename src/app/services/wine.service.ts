import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WineInteraction } from '../classes/wine-interaction';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  public moves = ["Fermentação", "Prensagem", "Transfega", "Adicionar ao Barril", "Movimentar Barril", "Tirar do Barril", "Colheita"];
  public containers = ["Tanque de Aço", "Barril de Madeira", "Garrafa", "Ovo de Cimento", "Outro"];

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

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
    return new Promise((resolve, reject) => {
        resolve([
          {
            id: "Cz2xVQJVjIvXctwlDhgY",
            date: "2002-12-12",
            location: "Peso da Régua",
            move: "Fermentação",
            temperature: 30.00,
            humidity: 80.00,
            container: null,
            responsible: "António Costa",
            addedElements: [
              {
                name: "Açúcar",
                quantity: 200
              }, 
              {
                name: "Álcool Vínico",
                quantity: 50
              }, 
            ]
          }
          ,
          {
            id: "Cz2xVQJVjIvXctwlDhgY",
            date: "2010-10-30",
            location: "Porto",
            move: "Movimentação de Barril",
            temperature: 12.00,
            humidity: 50.00,
            container: "Barril de madeira",
            responsible: "Marcelo Sousa",
            addedElements: []
          }
      ]);
    });
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

  public saveInteraction(interaction){    
    console.log(interaction);
    return new Promise((resolve, reject) => {
      resolve({ status: "OK" });
    });
  }

  

}
