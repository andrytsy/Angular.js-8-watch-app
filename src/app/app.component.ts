import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'watch-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private _sanitizer: DomSanitizer) {}

  title = 'watch-app';
  timer = Observable.timer(1000);
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12];

  date = new Date();
  hour = 0;
  minute = 0;
  second = 0;
  rotateS = this.getRotate(this.second);
  rotateM = this.getRotate(this.minute);
  rotateH = this.getRotate(this.hour);

  ngOnInit() {
    this.initUpdater()
  }

  initUpdater() {
    setInterval(() => {
      this.updateTime();
      this.updateRotatiom();
    }, 1000);
  }

  updateTime() {
    this.date = new Date();
    let UTCHour = this.date.getHours() + 1; 
    this.hour = (UTCHour > 12 ? UTCHour - 13 : UTCHour) * 5;
    this.minute = this.date.getMinutes();
    this.second = this.date.getSeconds();
  }

  updateRotatiom() {
    this.rotateS = this.getRotate(this.second);
    this.rotateM = this.getRotate(this.minute);
    this.rotateH = this.getRotate(this.hour);
  }

  getRotate(value) {
    return  this._sanitizer.bypassSecurityTrustStyle('translateX(-50%) rotate(' + (value * 6) + 'deg)')
  }
}
