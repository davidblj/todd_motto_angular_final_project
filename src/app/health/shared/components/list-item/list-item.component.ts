import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  // the item is put under a 'any' type 
  // as is going to be used by multiple 
  // components
  @Input()
  item: any

  @Output()
  remove = new EventEmitter<any>()

  toggled = false

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.toggled = !this.toggled
  }

  removeItem() {
    this.remove.emit(this.item)
  }

  getRoute() {
    return [`../meals`, this.item.$key]
  }
}
