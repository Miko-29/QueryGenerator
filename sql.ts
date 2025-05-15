
// 5sep
tableJoins = [
        // {id : -1, text : 'none'},
        {id : 0, text : 'Inner join'},
        {id : 1, text : 'Left join'},
        {id : 2, text : 'Right join'},
        {id : 3, text : 'Self join'},
        {id : 4, text : 'Cross join'},
    ]

selectOperators = [
        {id: -1, text: '='},
        {id: 0, text: '<>'},
        {id: 1, text: 'LIKE'},
        {id: 2, text: '>'},
        {id: 3, text: '>='},
        {id: 4, text: 'AND'},
        {id: 5, text: '<'},
        {id: 6, text: '<='},
        {id: 7, text: 'OR'},
        {id: 8, text: '-'},
        {id: 9, text: '%'},
        {id: 10, text: '()'},
        {id: 11, text: 'NOT'},
        {id: 12, text: 'IS'},
        {id: 13, text: 'IN'},
        {id: 14, text: '*'},
        {id: 15, text: '/'},
        {id: 16, text: 'ANY'},
        {id: 17, text: 'BETWEEN'},
        {id: 18, text: 'EXITS'},
        {id: 19, text: 'SOME'},
        {id: 20, text: 'WHERE'},
        {id: 21, text: '   '},
    ]


    // 15sep

    <div *ngIf="i === req_params.length-1 && queryBuilder()"></div>

    // 18sep
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAPIOptions } from '../encryption/EncryptionEnum';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private http: HttpClient) { }

 dbName: any;
 setDBName(data:any) {
  this.dbName = data;
 }
 getDB() {
  return this.dbName;
 }

  public dummyData() {
    return this.http.get('https://gorest.co.in/public/v2/users');
  }

//   public getTable() {
//     return this.http.get(environment.baseurl + 'tables');
//   }

}


/* 
  public getAppConfigurationInfo(page , perPage, layername) {
    return this.httpClient.get(environment.apiBaseUrl + 'appconf/getAllAppconfiguration?page=' + page + '&perPage=' + perPage+ '&layername=' + layername);
  }


  public getAllPreference(page , perPage) {
    return this.httpClient.get(environment.apiBaseUrl + 'appconf/getApppreference?page=' + page + '&perPage=' + perPage);
  }

   public saveInfo(details) {
     return this.httpClient.post(environment.apiBaseUrl + 'appconf/addAppPreference', details);
   }

   public updateInfo(details) {
    return this.httpClient.put  (environment.apiBaseUrl + 'appconf/updatePrefrenece', details);
  }
*/

// 

async runQuery() {
    this.db = this.commonService.getDB()
    this.query_outputs = null; // clear data
    let finalURL = environment.baseurl + 'getQueryData?query=' + this.finalquery + '&databaseName=' + 'Test_UAT_1' + '&host=' + '99.0.22.114';
    // let finalURL = environment.baseurl + 'getQueryData?query=' + this.finalquery + '&databaseName=' + this.db.dbName + '&host=' + this.db.ip;
    let apiOptions: IAPIOptions = { RequestMethod: RequestType.GET, RequestURL: finalURL }
    try {
      let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
      if (resp?.ResponseCode === 200) {
        Swal.fire("success", "query successfully run", "success");
        this.query_outputs = resp?.ResponseData;
        this.output_table_headers = Object.keys(this.query_outputs[0])
        console.log('response data = ', Object.keys(this.query_outputs[0]));
      }
    } catch (error) { 
      Swal.fire("error", 'please check query and database name', "error");
    }
  }

  // 

  import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {


    //Common Constants Start
    selectMethod = [
        { id: -1, text: 'GET' },
        { id: 0, text: 'POST' },
        { id: 1, text: 'PUT' },
        { id: 2, text: 'DELETE' },
    ];

    distinct = [
        {id: 1, text: 'DISTINCT'}
    ]
    //operators
    selectOperators = [
        { id: -1, text: '=' },
        { id: 0, text: '<>' },
        { id: 1, text: 'IS' },
        { id: 2, text: '>' },
        { id: 3, text: '>=' },
        { id: 4, text: '<' },
        { id: 5, text: '<=' },
        { id: 6, text: 'AND' },
        { id: 7, text: 'OR' },
        { id: 8, text: 'BETWEEN' },
        { id: 9, text: 'IS NULL' },
        { id: 10, text: 'IS NOT NULL' },
        { id: 11, text: 'IN' },
        { id: 12, text: 'NOT IN' },
        { id: 13, text: 'LIKE' },

        /* 
        {id: -1, text: '='},
        {id: 0, text: '<>'},
        {id: 1, text: 'LIKE'},
        {id: 2, text: '>'},
        {id: 3, text: '>='},
        {id: 4, text: 'AND'},
        {id: 5, text: '<'},
        {id: 6, text: '<='},
        {id: 7, text: 'OR'},
        {id: 8, text: '-'},
        {id: 9, text: '%'},
        {id: 10, text: '()'},
        {id: 11, text: 'NOT'},
        {id: 12, text: 'IS'},
        {id: 13, text: 'IN'},
        {id: 14, text: '*'},
        {id: 15, text: '/'},
        {id: 16, text: 'ANY'},
        {id: 17, text: 'BETWEEN'},
        {id: 18, text: 'EXITS'},
        {id: 19, text: 'SOME'},
        {id: 20, text: 'WHERE'},
        {id: 21, text: '   '},
        */
    ]


    tableJoins = [
        // {id : -1, text : 'none'},
        { id: 0, text: 'Inner join' },
        { id: 1, text: 'Left join' },
        { id: 2, text: 'Right join' },
        { id: 3, text: 'Self join' },
        { id: 4, text: 'Cross join' },
    ]

    aggregates = [
        { id: 0, text: 'COUNT' },
        { id: 1, text: 'SUM' },
        { id: 2, text: 'AVG' },
        { id: 3, text: 'MIN' },
        { id: 4, text: 'MAX' },
    ]
}

// 

.unique-label {
  font-size: 1em;
  width : 40%;
  margin-top : auto !important;
  margin-bottom : auto !important;
}



// 

CREATE TABLE public.mmi_re_callids
(
  sno integer NOT NULL DEFAULT nextval('mmi_wfp_callids_sno_seq'::regclass),
  process_id numeric,
  call_id character varying(100) NOT NULL,
  query text,
  column_sequence text,
  call_id_type character varying(2),
  call_id_description character varying(100),
  table_name character varying(500),
  orderby character varying(100),
  groupby character varying(100),
  remarks character varying(250),
  updatedon timestamp without time zone NOT NULL DEFAULT now(),
  limitby character varying(20),
  request_type character varying(15) DEFAULT 'query'::character varying,
  CONSTRAINT call_id_pk PRIMARY KEY (sno),
  CONSTRAINT call_id_unique UNIQUE (call_id)
)

// 

<ng-container *ngIf="data[header] === 'created_on' && data[header]">
                {{ data['created_on'] * 1000 | date: "dd-MM-yyyy HH:mm" }}
              </ng-container>
              <ng-container *ngIf="header !== 'created_on' || !data[header]">
                {{ data[header] }}
              </ng-container>

// 

<!-- -----------fetch tablesDetail data------------ -->
    <div class="table-container">
      <table class="bottom-table-section" *ngIf="tableDetails != undefined && onColumnSelected">
        <thead>
          <tr *ngIf="query_outputs">
            <th *ngFor="let header of output_table_headers">{{header}}</th>
          </tr>
        </thead>
        <tbody *ngIf="query_outputs">
          <tr *ngFor="let data of query_outputs">
            <td *ngFor="let header of output_table_headers">
              <ng-container *ngIf="header === 'created_on'">
                {{ data[header] | date: "dd-MM-yyyy HH:mm" }}
              </ng-container>
              <ng-container *ngIf="header !== 'created_on'">
                {{ data[header] }}
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- -----------fetch columns data end------------ -->

    // 

    //remove selected aggregate's selected column
  removeAggregate(event:any){
    this.aggregateColumn.splice(event.label,1);
  }


// 

  //for aggregates
      if (this.aggregate.length>0) {
        if(this.selected_columns.length>0){
          this.finalquery += ' , ';
        }
        loop_length = this.aggregate.length;
        for (let i = 0; i < loop_length; i++) {
          if (i > 0) {
            this.finalquery += ' , ';
          }
          this.finalquery += `${this.aggregate[i]}(${this.aggregateColumn[this.aggregate[i]] ? this.aggregateColumn[this.aggregate[i]] : ''})`;
        }
      }
      //end aggregates

      // 

      <ng-select [multiple]="true" [items]="allConstants.aggregates" placeholder="Select Aggregates"
                [searchFn]="selectMethodSearchable" bindLabel="text" bindValue="text" [(ngModel)]="aggregate"
                (ngModelChange)="queryBuilder()" (clear)="resetall('aggregate')" [disabled]="!selectedMethod || !selected_table"
                (remove)="removeAggregate($event)">

// 

request_type: any;
  sendDataAsPayload() {
    // Define the regular expression pattern to match values
    const valuePattern = /=\s*(['"])?([^'"]*)(['"])?/g;
    const modifiedQuery = this.finalquery.replace(valuePattern, '=?');
    const payload = {
      sno: 1,
      process_id: 123,
      call_id: 'example_call_id',
      query: modifiedQuery || '', // Replace with your actual finalquery logic
      column_sequence: this.selected_columns || '', // Modify this based on your logic
      call_id_type: '',
      call_id_description: '',
      table_name: this.selected_table || '', // Modify this based on your logic
      orderby: this.orderBy || [], // Modify this based on your logic
      groupby: this.groupBy || [], // Modify this based on your logic
      remarks: '',
      updatedon: '',
      limitby: '',
      request_type: this.request_type.text || ''
    };
    console.log('payload ---- ', payload);


    // let finalUrl = environment.baseurl + 'https://example.com/api/endpoint';
    // let apiOptions: IAPIOptions = {RequestMethod: RequestType.POST, RequestURL: finalUrl, RequestBody: payload}
    // try {
    //   let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
    //   if (resp?.ResponseCode === 200) {
    //     console.log('create api successfull - ', resp?.ResponseCode);
    //   }
    // } catch (error) { 
    //   Swal.fire("error");
    // } 
  }

  // 

<button class="create-btn" (click)="sendDataAsPayload()">Create</button>
[(ngModel)]="request_type"

// 


case 'GET':
        this.selected_columns = this.selected_columns.includes('*') ? '*' : this.selected_columns;
        this.finalquery = `SELECT ${this.selected_columns ? this.selected_columns : ''}`;

        //for aggregates
        if (this.aggregate.length > 0) {
          if (this.selected_columns.length > 0) {
            this.finalquery += ' , ';
          }
          loop_length = this.aggregate.length;
          for (let i = 0; i < loop_length; i++) {
            if (i > 0) {
              this.finalquery += ' , ';
            }
            this.finalquery += `${this.aggregate[i]}(${this.aggregateColumn[this.aggregate[i]] ? this.aggregateColumn[this.aggregate[i]] : ''})`;
          }
        }
        //end aggregates

        // from table
        this.finalquery += ` FROM ${this.selected_table ? this.selected_table : ''} `;

        // place where condition 
        if (this.req_params.length > 0) {
          this.finalquery += 'WHERE '
        }
        loop_length = this.req_params.length;
        for (let i = 0; i < loop_length; i++) {
          let txtval: any = document.getElementById(this.req_params[i] + i)
          if ((this.operators[i] !== 'IS NULL' && this.operators[i] !== 'IS NOT NULL' && this.operators[i] !== 'IN') && this.operators[i]) {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i] + ' \'' + txtval?.value + '\'';
            
            /* for between */
            let txtval2: any = document.getElementById(this.req_params[i] + (i + 1))
            if (this.operators[i] === 'BETWEEN') {
              if (txtval?.value && txtval.value !== '') {
                const maxValue = txtval2?.value;
                // Check if "AND" is already in finalquery
                // if (!this.finalquery.includes('AND')) {
                //   this.finalquery += ` AND `;
                // }
                this.finalquery += ` AND `+' \'' + maxValue + '\'';
                // i++;  // You can remove this line to ensure no additional operator is added
              } else {
                this.finalquery += ` `;
              }
            }
            /* --/ for between */
           
        }
        else if (this.operators[i] === 'IS NULL') {
          this.finalquery += this.req_params[i] + ' ' + this.operators[i];
        } else if (this.operators[i] === 'IS NOT NULL') {
          this.finalquery += this.req_params[i] + ' ' + this.operators[i];
        }
        else {
          this.finalquery += this.req_params[i];
        }
        if (this.logical_operators[i]) {
          this.finalquery += ' ' + this.logical_operators[i] + ' ';
        }
        // SELECT * FROM Customers WHERE Country IN ('Germany', 'France', 'UK');  
          // else if (this.operators[i] === 'IN') {
          //   const inValues = this.getInValuesForParam(this.req_params[i]); 
          //   if (inValues.length > 0) {
          //     this.finalquery += this.req_params[i] + ' IN (' + inValues.join(', ') + ')';
          //   }
          //   console.log('for IN operator - ', this.finalquery);
          // }
          /* --/ for IN operator */
        }

        //for group by
        if (this.groupBy.length > 0) {
          this.finalquery += ` GROUP BY ${this.groupBy} `;
        }
        //end group by

        //for order by
        if (this.orderBy.length > 0) {
          this.finalquery += ' ORDER BY ';
          loop_length = this.orderBy.length;
          for (let i = 0; i < loop_length; i++) {
            let order = $("input[type='radio'][name='sort" + this.orderBy[i] + "']:checked").val();
            if (!order) { order = 'ASC' }
            if (i > 0) {
              this.finalquery += ', ';
            }
            this.finalquery += this.orderBy[i] + ' ' + String(order).toUpperCase();
          }
        }
        //end order by
        break;

        // 

        <!-- ---------limit----------- -->
            <div class="input-field config-input">
              <label class="form-check-label" for="exampleCheck1">Limit</label>
              <input type="number" class="form-control input-item" placeholder="Limit" 
              (keyup)="queryBuilder()" [(ngModel)]="limit"  [disabled]="!selectedMethod || !selected_table" />
            </div>
          </div>
          <!-- ---------limit end------------- -->
//limit
        if(this.limit){
          this.finalquery += ` LIMIT ${this.limit}`;
        }
        //end limit

// 

sendDataAsPayload() {
    // payload with initial values
    const payload = {
      sno: 1,
      process_id: '',
      call_id: '',
      query: '',
      column_sequence: '',
      call_id_type: '',
      call_id_description: '',
      table_name: '',
      orderby: [],
      groupby: [],
      remarks: '',
      updatedon: '',
      limitby: '',
      request_type: ''
    };
  
    const valuePattern = /=\s*(['"])?([^'"]*)(['"])?/g;
    const modifiedQuery = this.finalquery.replace(valuePattern, '= ?');
    payload.query = modifiedQuery || '';
  
    // Set the selectedMethod as uppercase
    const selectedMethodUpper = String(this.selectedMethod).toUpperCase();
  
    switch (selectedMethodUpper) {
      case 'GET':
        payload.call_id = 'example_call_id';
        payload.column_sequence = this.selected_columns;
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      case 'PUT':
        payload.call_id = 'put';
        payload.column_sequence = this.postColumn ? this.postColumn.map((column:any) => `${column} = ?`).join(', ') : '';
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      case 'POST':
        payload.call_id = 'post';
        payload.column_sequence = this.postColumn ? this.postColumn.map((column:any) => `${column} = ?`).join(', ') : '';
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      case 'DELETE':
        payload.call_id = modifiedQuery;
        payload.column_sequence = this.selectedUniqueColumn ? this.selectedUniqueColumn.map((column:any) => `${column} = ?`).join(', ') : '';
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      default:
        break;
    }
  
    if (payload) {
      console.log('--------', payload);
      // let finalUrl = environment.baseurl + 'https://example.com/api/endpoint';
      // let apiOptions: IAPIOptions = {RequestMethod: RequestType.POST, RequestURL: finalUrl, RequestBody: payload}
      // try {
      //   let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
      //   if (resp?.ResponseCode === 200) {
      //     console.log('create api successful - ', resp?.ResponseCode);
      //   }
      // } catch (error) { 
      //   Swal.fire("error");
      // } 
    }
  }

  // 

  sendDataAsPayload() {
    // payload with initial values
    const payload = {
      sno: '',
      process_id: '',
      call_id: '',
      query: '',
      column_sequence: '',
      call_id_type: '',
      call_id_description: '',
      table_name: '',
      orderby: [],
      groupby: [],
      remarks: '',
      updatedon: '',
      limitby: '',
      request_type: ''
    };
  
    const valuePattern = /=\s*(['"])?([^'"]*)(['"])?/g;
    const modifiedQuery = this.finalquery.replace(valuePattern, '= ?');
    payload.query = modifiedQuery || '';
    // Set the selectedMethod as uppercase
    const selectedMethodUpper = String(this.selectedMethod).toUpperCase();
    switch (selectedMethodUpper) {
      case 'GET':
        payload.call_id = this.API_name;
        payload.column_sequence = this.selected_columns;
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      case 'PUT':
        payload.call_id = this.API_name;
        payload.column_sequence = this.postColumn ? this.postColumn.map((column: any) => `${column} = ?`).join(', ') : '';
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      case 'POST':
        payload.call_id = this.API_name;
        payload.column_sequence = this.postColumn ? this.postColumn.map((column: any) => `${column} = ?`).join(', ') : '';
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      case 'DELETE':
        payload.call_id = modifiedQuery;
        payload.column_sequence = this.selectedUniqueColumn ? this.selectedUniqueColumn.map((column: any) => `${column} = ?`).join(', ') : '';
        payload.table_name = this.selected_table || '';
        payload.orderby = this.orderBy;
        payload.groupby = this.groupBy;
        payload.limitby = this.limit;
        payload.request_type = this.request_type.text || '';
        break;
  
      default:
        break;
    }
  
    if (payload) {
      console.log('--------', payload);
      this.payloadService.setPayload(payload);
      // let finalUrl = environment.baseurl + 'https://example.com/api/endpoint';
      // let apiOptions: IAPIOptions = {RequestMethod: RequestType.POST, RequestURL: finalUrl, RequestBody: payload}
      // try {
      //   let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
      //   if (resp?.ResponseCode === 200) {
      //     console.log('create api successful - ', resp?.ResponseCode);
      //   }
      // } catch (error) { 
      //   Swal.fire("error");
      // } 
    }
  }

  // 

  decrement(event: any) {
    debugger
    let index = event.target.id;
    let param = this.req_params[index];
    if (this.operators[index] != "IS NULL" || this.operators[index] != "IS NOT NULL") {
      for (let i = index; i < this.req_params.length; i++) {
        let p = this.req_params[index];
        if (document.getElementById(p + i)) {
          let j = parseInt(i) + 1;
          let val = (<HTMLInputElement>document.getElementById(p + j))?.value;
          ((<HTMLInputElement>document.getElementById(p + i)).value) = (val ? val : '')
          if (this.operators[index] === "BETWEEN" && document.getElementById(p + j + 'max')) {
            let val = (<HTMLInputElement>document.getElementById(p + j + 'max'))?.value;
            ((<HTMLInputElement>document.getElementById(p + i + 'max')).value) = (val ? val : '')
          }
        }
      }
    }
    this.req_params.splice(index, 1);
    this.operators.splice(index, 1);
    if (this.logical_operators[index - 1]) {
      this.logical_operators.splice(index - 1, 1);
    }

    let counter = 0;
    for (let p of this.req_params) {
      if (p == param) {
        counter++;
      }
    };

    if (counter == 0) {
      this.selectedUniqueColumn = this.selectedUniqueColumn.filter((p: any) => p != param);
    }

    if (index==0) {
      this.logical_operators.splice(0,1);
    }
  }

  // 

  [hidden]="operators[i] === 'IS NULL' || operators[i] === 'IS NOT NULL'"

  // 

  import { Component, OnInit } from '@angular/core';
declare var side_nav_js: any;
declare var sidebar_icon_rotation: any;
declare var highlight_currenct_selected_element: any;
// declare var side_bar_mobileView: any;
declare var $ : any;
import { PayloadService } from 'src/app/services/payloadService/payload.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  constructor(private payloadService: PayloadService) {}
  ngOnInit() {
    // Subscribe to the payload data in the service
    this.payloadService.getPayload().subscribe((payload:any) => {
      this.dataList = payload;
      console.log('side-nav---',this.dataList.call_id);
    });
  }

  dataList: any = [];

  ngAfterViewInit(){
    side_nav_js();
    sidebar_icon_rotation();
    highlight_currenct_selected_element();
  }
}

// 

<li *ngIf="dataList">
                  <a class="nav-link inactive-file sub-files file-name" title="{{dataList.call_id}}">
                    <!-- <span class="material-icons-outlined sub_navigate_nxt">navigate_next</span> -->
                    <span class="material-icons-outlined"> description </span>
                    {{dataList.call_id.length > 9 ? dataList.call_id.slice(0, 9) + '...' : dataList.call_id }}
                    <div class="icons">
                      <span class="material-icons-outlined folder-icon" data-md-tooltip="Edit API">edit</span>
                      <span class="material-icons-outlined folder-icon" data-md-tooltip="Delete API">delete</span>
                    </div>
                  </a>

// 

onColumnSelected(val: any) {
    this.selected_columns = val.includes('*') ? ['*']: val;
  }

  // 

  onClick(val: string) {
    switch (val) {
      case 'input':       
        if (this.req_params.length > this.operators.length) {
        this.message = "Please select operator";
        }
        break;
      case 'param':
        if (this.req_params.length!=0 && this.logical_operators.length < this.req_params.length && !(this.req_params.length > this.operators.length)) {
          this.message = "Please select AND/OR"
        }
        break;
    }
  }

  (mouseover)="onClick('param')"
(mouseover)="onClick('input')"

// 

<span class="message">{{message}}</span>
.message{
  color: #dc3545;
  display: inline-block;
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.06px;
}

// 

async sendDataAsPayload() {    
    this.db = this.commonService.getDB() 
    const payload = {
      dataBaseConnection: {
        dbName: "Test_UAT_1",
        host: "99.0.22.114"
      },
      callId: {
        processId: parseInt(this.processId),
        callId: '',
        query: '',
        columnSequence: '',
        callIdType: '',
        call_id_description: '',
        tableName: '',
        orderby: this.orderBy.map((order:any )=> order.trim()).join(','),
        groupby:  this.groupBy.map((group:any )=> group.trim()).join(','),
        remarks: '',
        limitby: parseInt(this.limit),
        requestType: ''
      }
    }
    const valuePattern = /=\s*(['"])?([^'"]*)(['"])?/g;
    const modifiedQuery = this.finalquery.replace(valuePattern, '= ?');
    payload.callId.query = modifiedQuery || '';
    const cols = this.selected_columns.map((column:any )=> column.trim()).join(',');
    const selectedMethodUpper = String(this.selectedMethod).toUpperCase();
    switch (selectedMethodUpper) {
      case 'GET':
        payload.callId.callId = this.API_name;
        payload.callId.columnSequence = cols;
        payload.callId.tableName = this.selected_table|| '';
        payload.callId.requestType = this.request_type.text || '';
        break;

      case 'PUT':
        payload.callId = this.API_name;
        payload.callId.columnSequence = cols
        payload.callId.tableName = this.selected_table || '';
        payload.callId.requestType = this.request_type.text || '';
        break;

      case 'POST':
        payload.callId = this.API_name;
        payload.callId.columnSequence = cols
        payload.callId.tableName = this.selected_table || '';
        payload.callId.requestType = this.request_type.text || '';
        break;

      case 'DELETE':
        payload.callId = modifiedQuery;
        payload.callId.columnSequence = cols;
        payload.callId.tableName = this.selected_table || '';
        payload.callId.requestType = this.request_type.text || '';
        break;

      default:
        break;
    }

    if(payload) {
      console.log('is available---',payload);
      let finalUrl: string = environment.baseurl + 'table/insertdata';
      let apiOptions: IAPIOptions = {
        Headers: { 'Content-Type': 'application/json', token: 'test-my-token-authentication', },
        RequestMethod: RequestType.POST,
        RequestURL: finalUrl,
        RequestBody: payload
      } 
      try {
        let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
        if (resp?.ResponseCode === 200) {
          this.payloadService.setPayload(payload)
          Swal.fire('success',"insert data successfully");
        }
      }
     catch (error) {
      Swal.fire("error", "connection Failed", "error");
      }
    }
  }

  // 

  <div class="input-field config-input">
        <label for="api-name" class="form-label">Process Id</label>
        <input type="email" class="form-control input-item" id="api-name" placeholder="" [(ngModel)]="processId" />
      </div>

// 

resetall(event: any) {
    switch (event) {
      case 'all':
        this.finalquery = '';
        console.log('all');
        this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selected_table = null;
        this.selectedOperator = '';
        this.selected_columns = '';
        this.operators = [];
        this.logical_operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        break;
      case 'table':
        this.finalquery = '';
        console.log('getTable');
        this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selectedOperator = '';
        this.selected_columns = '';
        this.logical_operators = [];
        this.operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        break;
      case 'params':
        this.logical_operators = [];
        this.operators = [];
        this.selectedOperator = '';
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.logical_operators = [];
        this.message = '';
        break;
      case 'aggregate':
        this.aggregateColumn = [];
        break;
      default:
        break;
    }
  }

// 

  [data-md-tooltip]:before {
    content: attr(data-md-tooltip);
    position: absolute;
    bottom: -35px;
    padding: 8px;
    transform: translateX(-50%) scale(0);
    transition: transform 0.3s ease-in-out;
    transform-origin: top;
    background: #616161e6;
    color: white;
    border-radius: 2px;
    font-size: 12px;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    z-index: 1;
}
[data-md-tooltip]:before {
    content: attr(data-md-tooltip);
    position: absolute;
    bottom: -35px;
    padding: 8px;
    left : -50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.3s ease-in-out;
    transform-origin: top;
    background: #616161e6;
    color: white;
    border-radius: 2px;
    font-size: 12px;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    z-index: 1;
}

// 

case 'PUT':
        
        this.finalquery = `UPDATE ${this.selected_table ? this.selected_table : ''} SET `;
        //set clause
        let loop_set = this.postColumn?.length;
        for (let i = 0; i < loop_set; i++) {
          if (i > 0) {
            this.finalquery += ', ';
          }
          let text: any = document.getElementById('body' + this.postColumn[i])
          this.finalquery += this.postColumn[i] + ' = \'' + `${text?.value ? text.value : ' '}` + '\' ';
        }
        //where clause
        if (this.req_params.length > 0) {
          this.finalquery += 'WHERE '
        }
        loop_length = this.req_params.length;
         for (let i = 0; i < loop_length; i++) {
          let txtval: any = document.getElementById(this.req_params[i] + i)
          if ((this.operators[i] !== 'IS NULL' && this.operators[i] !== 'IS NOT NULL' && this.operators[i] !== 'IN') && this.operators[i]) {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i] + ' \'' + txtval?.value + '\'';

            /* for between */
            if (this.operators[i] === 'BETWEEN') {
              let txtval2: any = document.getElementById(this.req_params[i] + i + 'max')
              if (txtval?.value && txtval.value !== '') {
                const maxValue = txtval2?.value;
                this.finalquery += 'AND' + ' \'' + maxValue + '\'';
              } else {
                this.finalquery += '';
              }
            }
            /* --/ for between */

          }
          else if (this.operators[i] === 'IS NULL') {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i];
          } else if (this.operators[i] === 'IS NOT NULL') {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i];
          }
          else {
            this.finalquery += this.req_params[i];
          }
          if (this.logical_operators[i]) {
            this.finalquery += ' ' + this.logical_operators[i] + ' ';
          }
        }

        break;

// 

seletedMethodType(val: any) {
    console.log(val);
    if (val != undefined) {
      this.selectedMethod = val.text;
      console.log(this.selectedMethod);
    } else {
      // this.selectedMethod = '';
      console.log(this.selectedMethod);
    }
  }

// 

  //limit
        if (this.limit > 0) {
          this.finalquery += ` LIMIT ${this.limit}`;
        }
        //end limit
// 

/* for between */
            if (this.operators[i] === 'BETWEEN') {
              let txtval2: any = document.getElementById(this.req_params[i] + i + 'max')
              if (txtval?.value && txtval.value !== '') {
                const maxValue = txtval2?.value;
                this.finalquery += ' AND' + ' \'' + maxValue + '\'';
              } else {
                this.finalquery += '';
              }
            }
            /* --/ for between */

// 

<div *ngIf="limit < 0" class="message">Limit cannot be negative.</div>

// 

resetall(event: any) {
    switch (event) {
      case 'all':
        this.finalquery = '';
        console.log('all');
        // this.selectedMethod = '';
        this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selected_table = null;
        this.selectedOperator = '';
        this.selected_columns = '';
        this.operators = [];
        this.logical_operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        this.limit = '';
        break;
      case 'table':
        this.finalquery = '';
        this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selectedOperator = '';
        this.selected_columns = '';
        this.logical_operators = [];
        this.operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        this.limit = '';
        break;
      case 'params':
        this.logical_operators = [];
        this.operators = [];
        this.selectedOperator = '';
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.logical_operators = [];
        this.message = '';
        break;
      case 'aggregate':
        this.aggregateColumn = [];
        break;
      case 'column':
        this.finalquery = '';
        // this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selectedOperator = '';
        // this.selected_columns = '';
        this.logical_operators = [];
        this.operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        break;
        case 'postcolumn':
          this.finalquery = '';
          // this.selectedColumn = [];
          this.req_params = [];
          this.selectedUniqueColumn = [];
          this.postColumn = [];
          this.selectedOperator = '';
          // this.selected_columns = '';
          this.logical_operators = [];
          this.operators = [];
          this.orderBy = [];
          this.aggregate = [];
          this.aggregateColumn = [];
          this.groupBy = [];
          this.message = '';
          break;
      default:
        break;
    }
  }

  // 

  <div>
                <span *ngIf="finalquery" (click)="resetall('all')" class="material-icons-outlined"
                  data-md-tooltip="clear query" style="cursor: pointer; margin-right: 10px;">clear_all</span>
                <!-- <span *ngIf="finalquery" (click)="openEditModal()" class="material-icons-outlined" title="edit query" style="cursor: pointer;">edit</span> -->
              </div>

// 

(clear)="resetall('column')"

// 

resetall(event: any) {
    switch (event) {
      case 'all':
        this.finalquery = '';
        // this.selectedMethod = '';
        this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selected_table = null;
        this.selectedOperator = '';
        this.selected_columns = '';
        this.operators = [];
        this.logical_operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        this.limit = '';
        break;
      case 'table':
        this.finalquery = '';
        this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selectedOperator = '';
        this.selected_columns = '';
        this.logical_operators = [];
        this.operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        this.limit = '';
        break;
      case 'params':
        this.logical_operators = [];
        this.operators = [];
        this.selectedOperator = '';
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.logical_operators = [];
        this.message = '';
        break;
      case 'aggregate':
        this.aggregateColumn = [];
        break;
      case 'column':
        this.finalquery = '';
        // this.selectedColumn = [];
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.postColumn = [];
        this.selectedOperator = '';
        // this.selected_columns = '';
        this.logical_operators = [];
        this.operators = [];
        this.orderBy = [];
        this.aggregate = [];
        this.aggregateColumn = [];
        this.groupBy = [];
        this.message = '';
        break;
        case 'postcolumn':
          this.finalquery = '';
          // this.selectedColumn = [];
          this.req_params = [];
          this.selectedUniqueColumn = [];
          this.postColumn = [];
          this.selectedOperator = '';
          // this.selected_columns = '';
          this.logical_operators = [];
          this.operators = [];
          this.orderBy = [];
          this.aggregate = [];
          this.aggregateColumn = [];
          this.groupBy = [];
          this.message = '';
          break;
      default:
        break;
    }
  }

// 

<!-- --------------group-by-------------------- -->
            <div class="input-field config-input" *ngIf="selectedMethod=='GET'">
              <label class="form-check-label" for="exampleCheck1">Group By</label>
              <ng-select [multiple]="true" [(ngModel)]="groupBy" (change)="queryBuilder()" placeholder="Select Column"
                [disabled]="!selectedMethod || !selected_table">
                <ng-option value="{{item.columnName}}" *ngFor="let item of columnList">{{item.columnName}}</ng-option>
                </ng-select>
            </div>
            <!-- --------------group-by end-------------------- -->

//

 case 'PUT':
        
        this.finalquery = `UPDATE ${this.selected_table ? this.selected_table : ''} SET `;
        //set clause
        let loop_set = this.postColumn?.length;
        for (let i = 0; i < loop_set; i++) {
          if (i > 0) {
            this.finalquery += ', ';
          }
          let text: any = document.getElementById('body' + this.postColumn[i])
          this.finalquery += this.postColumn[i] + ' = \'' + `${text?.value ? text.value : ' '}` + '\' ';
        }
        //where clause
        if (this.req_params.length > 0) {
          this.finalquery += 'WHERE '
        }
        loop_length = this.req_params.length;
         for (let i = 0; i < loop_length; i++) {
          let txtval: any = document.getElementById(this.req_params[i] + i)
          if ((this.operators[i] !== 'IS NULL' && this.operators[i] !== 'IS NOT NULL' && this.operators[i] !== 'IN') && this.operators[i]) {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i] + ' \'' + txtval?.value + '\'';

            /* for between */
            if (this.operators[i] === 'BETWEEN') {
              let txtval2: any = document.getElementById(this.req_params[i] + i + 'max')
              if (txtval?.value && txtval.value !== '') {
                const maxValue = txtval2?.value;
                this.finalquery += 'AND' + ' \'' + maxValue + '\'';
              } else {
                this.finalquery += '';
              }
            }
            /* --/ for between */

          }
          else if (this.operators[i] === 'IS NULL') {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i];
          } else if (this.operators[i] === 'IS NOT NULL') {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i];
          }
          else {
            this.finalquery += this.req_params[i];
          }
          if (this.logical_operators[i]) {
            this.finalquery += ' ' + this.logical_operators[i] + ' ';
          }
        }

         //limit
         if (this.limit > 0) {
          this.finalquery += ` LIMIT ${this.limit}`;
        }
        //end limit

        break;