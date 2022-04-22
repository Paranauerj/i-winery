import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  public moves = ["Fermentacao", "Prensagem", "Transfega", "Adicionar ao Barril", "Movimentar Barril", "Tirar do Barril"];
  public containers = ["Tanque de Aço", "Barril de Madeira", "Garrafa", "Ovo de Cimento"];

  constructor() { }

  public getInfo(wineId){
    return new Promise((resolve, reject) => {
      resolve({
        id: wineId,
        name: "Vinho do João",
        year: 2000,
        type: "do Porto",
        country: "Portugal",
        producer: "João",
        image: null
      });
    });
  }

  public getInteractions(wineId){
    return new Promise((resolve, reject) => {
        resolve([
        {
          id: 1,
          date: "2002-12-12",
          location: "Peso da Régua",
          move: "Fermentação",
          temperature: 30.00,
          humidity: 80.00,
          container: null,
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
        },
        {
          id: 1,
          date: "2010-10-30",
          location: "Porto",
          move: "Movimentação de Barril",
          temperature: 12.00,
          humidity: 50.00,
          container: "Barril de madeira",
          addedElements: []
        }
      ]);
    });
  }

  public evaluate(stars){
    return new Promise((resolve, reject) => {
      resolve({ status: "OK" });
    });
  }

  public saveInteraction(interaction){    
    return new Promise((resolve, reject) => {
      resolve({ status: "OK" });
    });
  }
}
