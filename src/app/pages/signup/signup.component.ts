import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',  
  };
  submit=false;

  ngOnInit(): void {
  }

  formSubmit(){


    if(this.user.username=='' || this.user.username==null){
      // alert('username is required');
      this.snack.open('User Name is required !!', '',{
        duration:2000,

      })
      return;
    }else if(this.user.password=='' || this.user.password==null){
      // alert('username is required');
      this.snack.open('Password is required !!', '',{
        duration:2000,

      })
      return;
    }else if(this.user.firstname=='' || this.user.firstname==null){
      // alert('username is required');
      this.snack.open('First Name is required !!', '',{
        duration:2000,

      })
      return;
    }else if(this.user.email=='' || this.user.email==null){
      // alert('username is required');
      this.snack.open('Email Address is required !!', '',{
        duration:2000,

      })
      return;
    }
    console.log(this.user);

    //addUser
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
        // alert('success');
        Swal.fire('Sucessfully Done!!','User id is '+data.id,'success');

        this.user.username='';
        this.user.password='';
        this.user.firstname='';
        this.user.lastname='';
        this.user.email='';
        this.user.phone='';
      },
      (error)=>{
        console.log(error);
        // alert('something went wrong');
        this.snack.open('Something went wrong !!', '',{
          duration:2000,
          verticalPosition: 'top'
  
        })
      }

    )
      
  }
  

}
