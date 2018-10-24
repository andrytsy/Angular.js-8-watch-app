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
  hours = 0;
  minutes = 0;
  seconds = 0;
  rotateS = this.getRotate(this.seconds);
  rotateM = this.getRotate(this.minutes);
  rotateH = this.getRotate(this.hours);

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
    let UTCHour = this.date.getHours(); 
    this.hours = UTCHour > 12 ? UTCHour - 12 : UTCHour;
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
  }

  updateRotatiom() {
    this.rotateS = this.getRotate(this.seconds);
    this.rotateM = this.getRotate(this.minutes);
    this.rotateH = this.getRotate(this.hours*5);
  }

  getRotate(value) {
    return  this._sanitizer.bypassSecurityTrustStyle('translateX(-50%) rotate(' + (value * 6) + 'deg)')
  }
}
