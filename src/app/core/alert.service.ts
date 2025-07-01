import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  text: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _msg = new Subject<Alert>();
  /** Observable que los componentes escuchan */
  readonly msg$ = this._msg.asObservable();

  open(text: string, type: Alert['type'] = 'success') {
    this._msg.next({ text, type });
  }
}