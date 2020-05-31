import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaborator-detail',
  templateUrl: './collaborator-detail.component.html',
  styleUrls: ['./collaborator-detail.component.scss']
})
export class CollaboratorDetailComponent implements OnInit {
  collaborator: any;
  constructor() { 
    this.collaborator = window.history.state.data;
   }

  ngOnInit(): void {
    console.log(this.collaborator);
  }

}
