import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) { }

  ngOnInit(): void {

    this._route.params.subscribe(
      (params:any)=>{
        this.catId=params.catId;
        console.log(this.catId);

        if(this.catId==0){
          //load all quiz
    
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);
            },
            (error)=>{
              Swal.fire('Error !!','Can not load data from server','error');
            }
          );
        }
        else{
          //load specific quiz
          this._quiz.getActiveQuizzesByCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);
            },
            (error)=>{
              Swal.fire('Error !!','Can not load data from server','error');
            }
          );
        }
      }
    );


  }

}
