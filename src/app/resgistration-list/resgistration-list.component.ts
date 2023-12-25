import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-resgistration-list',
  templateUrl: './resgistration-list.component.html',
  styleUrls: ['./resgistration-list.component.scss'],
})
export class ResgistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort
 displayedColumns: string[] = ['id','firstName','lastName','email','mobile','bmiResult','gender','package','enquiryDate','action'];

 constructor(private api:ApiService,private router:Router,private confirm:NgConfirmService,private toast:NgToastService){}
 
 ngOnInit(): void {
   this.getUsers();
 }
 getUsers(){
  this.api.getRegisteredUser().subscribe(res=>{
    this.users=res;
    this.dataSource=new MatTableDataSource(this.users)
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort
  })
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
edit(id:number){
  this.router.navigate(['update',id])

}
deleteUser(id: number) {
  this.confirm.showConfirm("are you sure want to delete?",
  ()=>{
    this.api.deleteRegistered(id).subscribe(res=>{
      this.toast.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
this.getUsers()

    })
  },()=>{

  })

}


// deleteUser(id: number) {
//   this.confirmService.showConfirm("Are you sure want to Delete?",
//     () => {
//       //your logic if Yes clicked
//       this.apiService.deleteRegistered(id)
//         .subscribe({
//           next: (res) => {
//             this.toastService.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
//             this.getUsers();
//           },
//           error: (err) => {
//             this.toastService.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 3000 });
//           }
//         })
//     },
//     () => {
//       //yor logic if No clicked
//     })

// }


}