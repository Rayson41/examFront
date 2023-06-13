import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
  event.preventDefault();
}

  qId:any;
  questions:any;

  marksGot:any=0;
  correctAnswer:any=0;
  attempted:any=0;

  isSubmit:any=false;
  iscameraOn:any=false;
  timer:any;

  constructor(private locationSt: LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService) {


      history.pushState(null, "null", window.location.href);  
      this.locationSt.onPopState(() => {
        history.pushState(null, "null", window.location.href);
      });  
   }

  ngOnInit(): void {

    navigator.mediaDevices.getUserMedia({
      video: {
        width: 200,
        height: 150,
      }
    }
    ).then(()=>{
        this.iscameraOn=true;
    }).catch(err=>{
      console.log(err);
    });

    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);
  
   function disableF5(e:any) {
      if (((e.which || e.keyCode) == 116) || e.ctrlKey) e.preventDefault(); 
   };


    this.qId=this._route.snapshot.params['qid'];
    console.log(this.qId);
    this.loadQuestions();
  }

  // preventBackButton(){
  //   history.pushState(null,"null",location.href);
  //   this.locationSt.onPopState(()=>{
  //     history.pushState(null,"null",location.href);
  //   })
  // }

  loadQuestions(){
    this._question.getQueustionsOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;

        this.timer=this.questions.length*60;

        // this.questions.forEach((q:any)=>{
        //   q['givenAnswer']='';
        // });
        
        this.startTimer();
      },
      (error)=>{
        Swal.fire('Error !!','Error in loading questions','error');
      }
    );
  }


  submitQuiz(){
    Swal.fire({
      title:'Do you want to Submit the quiz ?',
      // showDenyButton:true,
      showCancelButton:true,
      confirmButtonText:'Submit',
      denyButtonText:'Dont Save',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.iscameraOn){
      if(this.timer <= 0 || !(document.hasFocus())){
        this.evalQuiz();
        clearInterval(t);
        this.iscameraOn=false;
      }else{
        this.timer--;
      }
    }
    },1000);
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){


    // call to server to check  answers

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.correctAnswer=data.correctAnswer;
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted=data.attempted
      },
      (error)=>{
        console.log(error);
      }
    );
    

    this.isSubmit=true;
    // //calculation

    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswer++;

    //     let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if(q.givenAnswer.trim() != ''){
    //     this.attempted++;
    //   }

    // })
    // console.log('correct answer: '+this.correctAnswer);
    // console.log('Marks got'+this.marksGot);
  }

  printPage(){
    window.print();
  }
}
