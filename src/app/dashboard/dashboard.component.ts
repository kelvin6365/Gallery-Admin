import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router , RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { } 
          
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  handleCollapsed(): void {
    this.isCollapsed =!this.isCollapsed;
  }

  
}
