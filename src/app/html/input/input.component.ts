import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() id?: string;
  @Input() errorMessage?: string;

  constructor() {


  }

  ngOnInit() {
    if (!this.id) {
      this.id = 'id-' + Math.ceil(Math.random() * 10000000);
    }
  }

}
