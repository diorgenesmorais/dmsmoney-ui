import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()"
      class="ui-message ui-messages-error">
      <span>{{ text }}</span>
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
      border-radius: 5px;
    }
    `]
})
export class MessageComponent {

@Input() error: string;
@Input() control: FormControl;
@Input() text: string;

temErro(): boolean {
  return this.control.hasError(this.error) && this.control.dirty;
}
}
