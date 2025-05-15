import { Component, NgModule } from '@angular/core';
import { MpngoServiceService } from '../mpngo-service.service';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/UserModule/user/auth/auth.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';



@Component({
  selector: 'app-mongo-query-generator',
  
   standalone:false,
  templateUrl: './mongo-query-generator.component.html',
  styleUrl: './mongo-query-generator.component.css'
})
export class MongoQueryGeneratorComponent {
  columns: any[] = [];
  popupData: any = null;
  databases = [];
  availableDatabases: string[] = [];
  availableFields: string[] = [];
  selectedDatabase: string = '';
  selectedField: string = '';
  selectedOperator: number;
  selectedConditionType: string = 'and';
  inputValue: string = '';
  conditionArray: any[] = [];
  generatedQuery: any = {};
  skip: number = 0;
  sortField: any;
  sortOrder: number;
  limit: number = 50;
  tableData: any[] = [];
  json: any = {};
  mongoData: any[] = [];
  displayedColumns: string[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  isTableView: boolean = true;

  // Operators List
  operatorList: any[] = [
    { id: 1, name: "eq" },
    { id: 2, name: "lte" },
    { id: 3, name: "gte" },
    { id: 4, name: "btw" },
    { id: 5, name: "In" },
    { id: 6, name: "ne" },
    { id: 7, name: "nin" }
  ];

   operatorMapObj: { [key: number]: string } = {
    1: "eq",
    2: "lte",
    3: "gte",
    4: "btw",
    5: "In",
    6: "ne",
    7: "nin",
  };
  
  

  constructor(
    private mongoService: MpngoServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private homeComponent: HomeComponent,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.mongoService.getMongoDbName().subscribe(
      (response: HttpResponse<any>) => {
        this.availableDatabases = response.body;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError(error);
      }
    );
  }

  onDataBaseChange() {
    this.spinner.show();
    this.availableFields=[];
    this.conditionArray=[];
    this.mongoData=[];
    this.paginatedData=[];
    this.isNewDatabase=false;
    this.updatePagination();
    this.selectedField=null;
    this.selectedOperator=null;
    this.inputValue=null;
    this.mongoService.getMongoFieldName(this.selectedDatabase).subscribe(
      (response: HttpResponse<any>) => {
        this.availableFields = response.body;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.showError(error);
      }
    );
  }

  addCondition() {
    let value: any;
    
    if (this.selectedOperator == 5 || this.selectedOperator == 7) {
      value = this.inputValue.split(',').map(v => v.trim());
    } else if (this.selectedOperator == 4) {
      value = this.inputValue.split(',').map(v => v.trim());
    } else {
      value = this.inputValue;
    }

    let obj = {
      "valArr": value,
      "fieldname": this.selectedField,
      "operation": this.selectedOperator
    };

    let index = this.conditionArray.findIndex(cond => cond.fieldname === this.selectedField);
    if (index !== -1) {
      this.conditionArray[index] = obj;
    } else {
      this.conditionArray.push(obj);
    }
  }

  removeCondition(fieldname: string) {
    this.conditionArray = this.conditionArray.filter(cond => cond.fieldname.trim() !== fieldname.trim());
  }

  updateQuery() {
    this.generatedQuery = { query: this.conditionArray };
    this.fireQuery();
  }

  fireQuery() {
    //this.conditionArray=[];

    this.spinner.show();

    this.json = {
      "query": this.conditionArray,
      "limit": this.limit,
      "dbName": this.selectedDatabase,
      "skip": this.skip,
      "sort": this.sortOrder,
      "sortField": this.sortField,
      "isNewDatabase":this.isNewDatabase
    };

    this.mongoService.fireQuery(this.json).subscribe(
      (response: HttpResponse<any>) => {
        if(response.body.data!=null){
          this.mongoData = response.body.data;
          this.displayedColumns = Object.keys(this.mongoData[0] || {});
          this.currentPage = 1;
          this.updatePagination();
          this.spinner.hide();
        }else{
          this.showError("error occured");
          this.spinner.hide();
        }
     
      },
      (error) => {
        this.spinner.hide();
        this.showError(error);
      }
    );
  }

  toggleView() {
    this.isTableView = !this.isTableView;
  }

  openPopup(data: any) {
    this.popupData = data;
  }

  closePopup() {
    this.popupData = null;
  }

  getColumns(data: any[]): string[] {
    let columns = new Set<string>();
    data.forEach(row => Object.keys(row).forEach(key => columns.add(key)));
    return Array.from(columns);
  }

  isComplex(value: any): boolean {
    return value && (typeof value === 'object' || Array.isArray(value));
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  expandedRowIndex: number | null = null;
  expandedJson: any = null;

  toggleExpand(index: number, col: string): void {
    if (this.expandedRowIndex === index) {
      this.expandedRowIndex = null;
      this.expandedJson = null;
    } else {
      this.expandedRowIndex = index;
      this.expandedJson = this.mongoData[index][col];
    }
  }

  //currentPage: number = 1;
  recordsPerPage: number = 10;
  paginatedData: any[] = [];

  updatePagination() {
    this.spinner.show()
    this.totalPages = Math.ceil(this.mongoData.length / this.recordsPerPage);
    this.paginatedData = this.mongoData.slice((this.currentPage - 1) * this.recordsPerPage, this.currentPage * this.recordsPerPage);
    this.spinner.hide()
  }

  previousPage() {
    this.spinner.show();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
    this.spinner.hide();
  }

  nextPage() {
    this.spinner.show();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
    this.spinner.hide();
  }

showError(error: any) {
  if (error.status == 401) {
  swal({
        type: 'warning',
        title: '* fields are mandatory',
        text: 'Please select Expiry date',
        allowOutsideClick: false
      });



  } else {
    
    swal({
      type: 'warning',
      title: 'Error Occured',
      text: error.error,
      allowOutsideClick: false
    });
  }
  this.spinner.hide();
}
onTableViewChange(){
  this.isTableView=!this.isTableView;
}
clearInputs() {
  this.inputValue = '';
}


closePropPanel() {
  this.popupData = null;
}


searchText: string = '';


search(): void {

 
//this.spinner.show();
  const lowerSearch = this.searchText.trim().toLowerCase();

  if (!lowerSearch) {
    this.paginatedData = [...this.mongoData]; // Reset to full data if search is empty
    return;
  }

  this.paginatedData = this.mongoData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(lowerSearch)
    )
  );
  if(this.paginatedData.length!=0){
    this.totalPages = Math.ceil(this.paginatedData.length / this.recordsPerPage);
    this.paginatedData = this.paginatedData.slice((this.currentPage - 1) * this.recordsPerPage, this.currentPage * this.recordsPerPage);
   // this.spinner.hide();
  }else{
    this.paginatedData=[...this.mongoData];
    this.updatePagination();
  }
  
  this.currentPage=1;


}


isNewDatabase:Boolean=false;
isChangeDatabase(){
  this.isNewDatabase=!this.isNewDatabase;
}



downloadJson(): void {
 
  const jsonData = JSON.stringify(this.mongoData, null, 2); 

  const blob = new Blob([jsonData], { type: 'application/json' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = this.selectedDatabase+'.json';
  document.body.appendChild(a); 
  a.click(); 

  document.body.removeChild(a); 
  window.URL.revokeObjectURL(url); 
}
}
