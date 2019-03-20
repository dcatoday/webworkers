import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebWorkerService {

  constructor() { }

  workers: Array<Worker> = [];

  messages: Array<Subject<any>> = [];

  configureWorker() {
  
    if(window['Worker']) {
      this.workers.push(new Worker("/assets/worker.js"));
      this.messages.push(new Subject());
      const index = this.workers.length-1;
      
      this.workers[index].onmessage = (e) => {
        this.messages[index].next({worker:index,data:e.data});
      }

      return {worker:index,message:this.messages[index]};
    } else {
      console.log('Web workers are not supported in this browser.')
    }
  }

  runThread(index:number = 0,data) {
    if(window['Worker']) {
      this.workers[index].postMessage(data);
    } else {
      console.log('Web workers are not supported in this browser.')
    }
  }



}
