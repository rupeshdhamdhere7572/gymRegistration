import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
 
public userID!:number
 userDetail!:User
 constructor(private activatedRoute:ActivatedRoute,private api:ApiService) {}

  ngOnInit(): void {
this.activatedRoute.params.subscribe(val=>{
  this.userID=val['id']
  this.fetchUserDetails(this.userID)
})
  }
fetchUserDetails(userID:number){
  this.api.getRegisteredUserId(userID).subscribe(res=>{
    this.userDetail=res
  })
}
}