import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent implements OnInit, DoCheck {
  constructor(private http:HttpClient, private  router:Router) {}
  @Input() data: any;
  ngOnInit(): void {}
  selectedPriority: any;
  selectedStatus: any;
  isUpdate: boolean = false;
  formCleared: boolean = true;
  isDataFound: boolean = false;
  ngDoCheck() {
    console.log(this.isUpdate);

    if (this.data && !this.isDataFound) {
      this.isDataFound = true;
      this.selectedPriority = this.data?.priority;
      this.selectedStatus = this.data?.status;
      this.taskForm.patchValue({
        taskName: this.data?.name,
        priority: this.data?.priority,
        status: this.data?.status,
        deadLine: this.data?.deadline,
      });
      this.isUpdate = true;
    }
  }

  taskForm = new FormGroup({
    taskName: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl(''),
    status: new FormControl(''),
    deadLine: new FormControl(''),
  });

  taskBlankForm = new FormGroup({
    taskBlankName: new FormControl(''),
    taskBlankDescription: new FormControl(''),
    blankPriority: new FormControl(''),
    blankStatus: new FormControl(''),
    blankDeadLine: new FormControl(''),
  });

  createTask() {
    var Url = " http://localhost:8081/createTask";
    var data = this.taskForm.value;
    var email = sessionStorage.getItem('email')
    data["email"]= email;
    //data["description"] =" this is desxcription"
   
    console.log("task value",data);
    this.http.post<any>(Url, data).subscribe((res) => {
      if (res.result == 1) {
        console.log("create task",res)
        this.router.navigateByUrl('/home');
      }
    });
   // console.log(this.taskBlankForm.value);
  }

  patchTask() {
    var putUrl = " http://localhost:8081/updateTask/";
    // this.http.put<any>(putUrl,)
    console.log(this.taskForm.value);
  }

  loadBlankForm() {
    console.log('hello');
    this.taskBlankForm.patchValue({
      taskName: '',
      priority: '',
      status: '',
      deadLine: '',
    });
  }
}
