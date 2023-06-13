import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upadte-quiz',
  templateUrl: './upadte-quiz.component.html',
  styleUrls: ['./upadte-quiz.component.css']
})
export class UpadteQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
     private _quiz:QuizService,
     private _cat:CategoryService,
     private _router:Router) { }

  qId = 0;
  quiz:any;
  categories:any;

  ngOnInit(): void {

    this.qId=this._route.snapshot.params['qId'];
    
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        alert('Error in loading data');
      }
    );

  }

  //update form submit
  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Quiz updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error !!','Error in updating','error');
      }
    );
  }

}
