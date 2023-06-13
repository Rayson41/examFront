import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quiz:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.qId=this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz=data;
      },
      (errror)=>{
        Swal.fire('Error !!','Error in loading data from server','error');
      }
    );

  }

  startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz ?',
      // showDenyButton:true,
      showCancelButton:true,
      confirmButtonText:'Start',
      // denyButtonText:''
      icon:'info',
    }).then((result)=>{
      if(result.isConfirmed){
        
        this._router.navigate(['/start/'+this.qId]);
      }
    })
  }

}
