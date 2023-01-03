import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AccountApp';

  showFiller = false;
  panelOpenState = false;

  @Output() click = new EventEmitter()
}
