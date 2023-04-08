import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentPaymentStatus } from '../model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

constructor() { }

currentStatus = new BehaviorSubject<CurrentPaymentStatus>(null);

}
