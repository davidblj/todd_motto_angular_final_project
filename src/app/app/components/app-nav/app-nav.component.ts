import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// tell angular to stop looking for changes on this component. Its only
// logical as we dont have inputs to check changes for 
@Component({
  selector: 'app-app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-nav.component.html',  
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
