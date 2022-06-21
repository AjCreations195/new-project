import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {
  @Input() isExpanded = true;
  @Output() toggleMenu = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public routeLinks = [
    { link: "home", name: "home", icon: "home" },
    { link: "auth", name: "Login", icon: "login" },
  ];
}
