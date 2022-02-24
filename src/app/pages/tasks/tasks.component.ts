import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { IGarden } from 'src/model/garden';
import { Subscription} from "rxjs";
import { TasksService } from './tasks.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Gardens } from 'src/model/Iga';
import { DatePipe } from '@angular/common';



@Component({
  templateUrl: 'tasks.component.html'
})


export class TasksComponent implements OnInit, OnDestroy{
  garden: IGarden[] = [];
  tempList: [] = [];
  gardenList!: IGarden[];
  sub!: Subscription;
  errorMessage: string = '';
  selectedRows: number[] = [];
  test: string = "";
  plantsCount: number = 0;
  gList: Array<Gardens> = [];
  
  postBody: any;
  x: any;

  todayDateTime = new Date();

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  selectedRowsData: any;
  constructor (private tasksService: TasksService) { 
    
  }
 
   getSelectedData1() {
    this.dataGrid.instance.getSelectedRowsData().then( (rowData) => {
      for(let i = 0; i < rowData.length; i++)
      {
        let o = new Gardens();
        o.key = rowData[i].key;
        o.value = rowData[i].value;
        o.waterTime = rowData[i].waterTime;
        o.notes = rowData[i].notes;

        this.gList.push(o);
        this.plantsCount = rowData.length;
      }
      
      
    })
    this.postBody = JSON.stringify(this.gList);
  }
  checkCount(e:any){
    const rowData = e.row && e.row.data;
    if (rowData)
    {
      this.x = rowData.key;
    }
    alert(this.x)
  }
  checkNew(e:any) {
    const rowData = e.row && e.row.data;
    let o1 = new Gardens();
    if (rowData)
    {

      this.x = rowData.key;
      
        o1.key = rowData.key
        o1.value = rowData.value;
        o1.waterTime = rowData.waterTime;
        this.gList.push(o1);
        
    }
    alert(JSON.stringify(this.gList));
    this.gList = [];
  }

  waterPlants() {
    for(let i=0; i<this.gList.length; i++){

      let x = this.gList[i].waterTime;
            

      var dd = new Date(this.gList[i].waterTime);

    }

    this.postBody = JSON.stringify(this.gList);
    //console.log('after', this.postBody);
    setTimeout(() => {
      this.getSelectedData1();
          this.sub = this.tasksService.waterPlants(this.postBody)
          .subscribe(data => {
            console.log(data)
            this.getGarden();
          })
  
        this.gList = [];
        this.postBody = null;  
    }, 10000);
    
  }
  getGarden() {
    this.sub = this.tasksService.getGarden().subscribe({
      next: garden => {
        this.garden = garden;
      },
      error: err => this.errorMessage = this.errorMessage
    }); 
  }
  click(): void {
    this.getGarden();
  }

  ngOnInit(): void {
    this.getGarden();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
