import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  menu: MenuItem[];

  constructor(private router: Router) {
    this.menu = [
      { label: 'Projects', icon: 'pi pi-folder', routerLink: ['']},
      { label: 'Profile', icon: 'pi pi-user'},
      { label: 'Import', icon: 'pi pi-briefcase'}
    ];
  }

  ngOnInit() { }
}
