import { Injectable, Output, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BgService {
  default: boolean;
  kontakt: boolean;
  onama: boolean;

@Output() oBG: EventEmitter<object> = new EventEmitter();
  constructor() {}

  setD(pom: boolean)
  {
    this.default = pom;
    this.kontakt = !pom;
    this.onama = !pom;
    this.oBG.emit({default: this.default, kontakt: this.kontakt, onama: this.onama});

  }

  setK(pom: boolean)
  {
    this.default = !pom;
    this.kontakt = pom;
    this.onama = !pom;
    this.oBG.emit({default: this.default, kontakt: this.kontakt, onama: this.onama});

  }

  setO(pom: boolean)
  {
    this.default = !pom;
    this.kontakt = !pom;
    this.onama = pom;
    this.oBG.emit({default: this.default, kontakt: this.kontakt, onama: this.onama});

  }

}
