import { Component } from '@angular/core';
import { WebWorkerService } from './services/web-worker.service';
declare const require;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';
  test = require('../assets/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg');
  subs = [];
  calculated;
  workerList = [];

  constructor(private worker: WebWorkerService) {}

  ngOnInit() {
    this.configureWorker(10);
  }

  configureWorker(x:number) {
    for(let i = 0; i<=x; i++) {
      const workObj = this.worker.configureWorker();
      this.subs.push(
        workObj.message.subscribe(
          (data) => {
            console.log(data);
            this.calculated = data;
          }
        )
      );
      this.workerList.push(workObj.worker);
    }
  }

  onClick() {
    this.workerList.forEach((thread)=>{
      this.worker.runThread(thread,[100000,10000]);
    });
    // for(let i = 0; i<10; i++) {
    //   console.log(this.longHardFunction([100000,10000]));
    // }
    console.log('not blocked!!!!!!!!!!!!!!!!!')
    // console.log(this.longHardFunction());
  }

  clicked() {
    console.log('hello');
  }



  longHardFunction([a,b]) {
    let x = 0;
    for(let i = 0; i<a; i++) {
      for(let j = 0; j < b; j++) {
        x += j;
      }
    }
    return x;
  }

  //http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg
}
