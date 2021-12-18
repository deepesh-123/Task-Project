import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
})
export class SidePanelComponent implements OnInit {
  constructor(private http : HttpClient) {}
  tasksList :any
  @Output() taskEvent = new EventEmitter();

  ngOnInit(): void {
    var param1 = sessionStorage.getItem('email')
    console.log(" email session is in", param1);
    if(param1!= null){
    var param = new HttpParams().append('email',param1); //Create new HttpParams
    this.http.get('http://localhost:8081/getTaskByEmail/'+param1).subscribe((data)=>{
       this.tasksList= data;
       if(this.tasksList.priority== 2)
       this.tasksList.priority = "High";
       if(this.tasksList.priority== 1)
       this.tasksList.priority = "Medium";
       if(this.tasksList.priority== 0)
       this.tasksList.priority = "Low";
    })}
  }
  

  
 // this.http.get(''/getTaskByEmail/:email'').subscribe(()=>{

 // })

   
  

  // tasksList: any = [
  //   {
  //     name: 'Task Name',
  //     deadline: new Date('01/01/2021'),
  //     priority: 'high',
  //     status: 'underProgress',
  //   },
  //   {
  //     name: 'Task Name',
  //     deadline: new Date('01/01/2021'),
  //     priority: 'high',
  //     status: 'Complete',
  //   },
  //   {
  //     name: 'Task Name',
  //     deadline: new Date('01/01/2021'),
  //     priority: 'high',
  //     status: 'Complete',
  //   },
  //   {
  //     name: 'Task Name',
  //     deadline: new Date('01/01/2021'),
  //     priority: 'high',
  //     status: 'Complete',
  //   },
  //   {
  //     name: 'Task Name',
  //     deadline: new Date('01/01/2021'),
  //     priority: 'high',
  //     status: 'Complete',
  //   },
  //   {
  //     name: 'Task Name',
  //     deadline: new Date('01/01/2021'),
  //     priority: 'high',
  //     status: 'Complete',
  //   },
  // ];

  selectTask(data: any) {
    this.taskEvent.emit(data);
  }
}
