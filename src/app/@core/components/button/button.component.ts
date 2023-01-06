import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() btnClick = new EventEmitter();
  @Input() textContent: string = ''
  @Input() class: string = ''
  constructor(){}

  ngOnInit(){}

  onClick() {
		this.btnClick.emit();
	}
}
