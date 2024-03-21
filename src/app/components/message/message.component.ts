import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/core/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() data!:Message
  constructor() { }

  ngOnInit(): void {
  }

}
