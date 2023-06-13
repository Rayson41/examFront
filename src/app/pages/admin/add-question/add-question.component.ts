import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qId:any;
  qTitle:any;

  question:any={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  constructor(
    private _route:ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title']
    this.question.quiz['qId']=this.qId;
  }

  formSubmit(){
    if(this.question.content.trim()=='' || this.question.content==null){
      this._snack.open('Please give some content','',{
        duration:2000,
      });
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null){
      this._snack.open('Please give first option','',{
        duration:2000,
      });
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      this._snack.open('Please give second option','',{
        duration:2000,
      });
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null){
      this._snack.open('Please select correct answer','',{
        duration:2000,
      });
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Question added successfully','success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error)=>{
        Swal.fire('Error !!','Error while adding question','error');
      }
    );
  }

}
