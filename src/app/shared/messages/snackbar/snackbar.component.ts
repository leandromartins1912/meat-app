import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { NotificationService } from '../notifications.service'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: 0
      })),
      state('visible', style({
        opacity: 1,
        bottom: 30
      })),
      transition('*=>*', animate('500ms 0s ease-in-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
    .do(message=>{
      this.message = message;
      this.snackVisibility = 'visible';      
    }).switchMap(message=>Observable.timer(3000))
    .subscribe(timer=> this.snackVisibility = 'hidden')
  }

}
