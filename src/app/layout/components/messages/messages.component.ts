import { Component, type OnInit } from '@angular/core';
import { MessagesService } from '../../../core';
import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message = '';

  constructor(
    public messagesService: MessagesService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.store.dispatch(
      RouterActions.go({
        path: [{ outlets: { messages: null } }]
      })
    );
    this.messagesService.isDisplayed = false;
  }

  onSend(): void {
    if (this.message) {
      this.messagesService.addMessage(this.message);
      this.message = '';
    }
  }
}
