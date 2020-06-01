import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {
  appareilsSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) {}

  private appareils: any[] = [];

  emitAppareilsSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilsSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilsSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilsSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilsSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find((appareilObject) => {
      return appareilObject.id === id;
    });
    return appareil;
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilsSubject();
  }

  saveAppareilsToServer() {
    this.httpClient
      .put(
        'https://openclassrooms-f971a.firebaseio.com/appareils.json',
        this.appareils
      )
      .subscribe(
        () => {
          console.log('enregistrement terminé');
        },
        (error: any) => {
          console.log('erreur de sauvegarde ' + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://openclassrooms-f971a.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilsSubject();
        },
        (error: any) => {
          console.log('erreur de chargement ' + error);
        }
      );
  }
}
