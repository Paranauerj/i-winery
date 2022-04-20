import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WineService {

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
          date: "2012-12-12",
          type: "Movimentação de Barril",
          temperature: "30",
          humidity: "80",
          location: "Peso da Régua"
        },
        {
          date: "2010-10-30",
          type: "Movimentação de Barril",
          temperature: "12",
          humidity: "50",
          location: "Porto"
        }
      ]);
    });
  }

  public evaluate(stars){
    return new Promise((resolve, reject) => {
      resolve({ status: "OK" });
    });
  }
}
