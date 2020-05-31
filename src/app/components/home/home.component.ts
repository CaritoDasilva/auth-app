import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  collaborators: MatTableDataSource<any>;
  displayedColumns: string[];
  constructor( private usersService: UsersService, private router: Router) { 
    this.collaborators;
    this.displayedColumns = ['picture', 'name', 'email', 'username'];

  }

  ngOnInit(): void {
    this.getCollaborators();
  }
  
  getCollaborators() {
    this.usersService.getRandomUsers().subscribe((data: any) => {
      console.log(data)
      this.collaborators = new MatTableDataSource<any>(data.results);
      this.collaborators.paginator = this.paginator;
    })    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.collaborators.filter = filterValue.trim().toLowerCase();
  }

  collaboratorDetail(index: number) {    
    console.log(index)
    console.log(this.collaborators.filteredData[index])
    this.router.navigate(['colaborador', this.collaborators.filteredData[index].login.username], {state: {
      data:this.collaborators.filteredData[index]
    }})
  }

}
