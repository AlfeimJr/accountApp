import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Output() btnClick = new EventEmitter();

  ngOnInit(): void{

  }

  onClick() {
		this.btnClick.emit();
	}
}
