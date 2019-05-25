import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @Output() handleCollapsed : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleCollapsedClick() {
    this.handleCollapsed.emit();
  }

}
