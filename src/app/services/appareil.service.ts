import { Subject } from 'rxjs/Subject';

export class AppareilService {
  appareilsSubject = new Subject<any[]>();

  private appareils: any[] = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint',
    },
    {
      id: 2,
      name: 'Télévision',
      status: 'allumé',
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint',
    },
  ];

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
}
