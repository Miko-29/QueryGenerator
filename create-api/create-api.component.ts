import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/services/commonServices/common.service';
import { IAPIOptions, RequestType } from 'src/app/services/encryption/EncryptionEnum';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AppConstants } from "src/app/constants/app.constants";
import { log } from 'console';
import { CreateNewAppComponent } from '../create-new-app/create-new-app.component';

declare var select_Library: any;
@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss']
})
export class CreateApiComponent {



  selected_table: any; // current selected table
  selected_columns: any = []; // current selected columns
  req_params: any; // request parameter
  group_col: any; // group by column names
  aggregatesFun: any; // aggregates function
  output_table_headers: any; // result table header
  query_outputs: any;
  finalquery: any;
  operators: any = [];
  constructor(private encryption_service: EncryptionService, private commonService: CommonService) { }
  allConstants: any = new AppConstants();

  ngAfterViewInit() {
    // select_Library();
  }


  ngOnInit() {
    this.getTableList();
    this.db = this.commonService.getDB()
    console.log('my msgs- ', this.db );
  }
  db: any;

  tableList: any = [];
  columnList: any = [];
  tableDetails: any = [];
  table_details_schema: any = [];
  tableJoins: any = [];
  table_details_data: any = [];
  selectedJoinTable: any = []; //table for joining
  selectedJoinColumn: any = [];//column for joining
  dropdownsNumbers: any = [];
  data: any = [];
  selectedUniqueColumn: any = [];
  selectedMethod: any;
  query: any = ''
  data_values: any;
  tableDetails_schema: any;
  selectedTable: any;
  selectedColumn: any;
  selectedOperator: any;
  removeOperator: boolean = false;
  isOperatorBtnSelected: boolean = true;
  isVerified: boolean = true
  selected: any;
  filtered: any;
  queryBuilderTable_name: any;
  queryBuilderColumn_name: any;
  uniqueCol: any;
  postColumn: any;
  logical_operators: any = [];


  async getTableList() {
    
    let finalUrl = environment.baseurl + 'tables';
    let apiOptions: IAPIOptions = { RequestMethod: RequestType.GET, RequestURL: finalUrl, }
    let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
    if(this.db !== undefined) {
    this.tableList = resp?.ResponseData;
    console.log('table list = ', this.tableList);
    }
  }

  async onTableSelected(val: any) {
    if (val != '') {
      this.selectedTable = val
      this.query = 'select'
      let finalUrl = environment.baseurl + 'table/schema/' + this.selectedTable; //getColumn API 
      let apiOptions: IAPIOptions = { RequestMethod: RequestType.GET, RequestURL: finalUrl }
      let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
      this.columnList = resp?.ResponseData;
      console.log('column list ------', this.columnList);
      /* -------for tablesDetail API --------- */
      let tablesDetailURL = environment.baseurl + 'tableDetails/' + this.selectedTable; // getTableDetails API
      let apiOptionsTableDetails: IAPIOptions = { RequestMethod: RequestType.GET, RequestURL: tablesDetailURL }
      let resp_tableDetails: any = await this.encryption_service.apiCaller(apiOptionsTableDetails, null);
      console.log('table-details----', resp_tableDetails);
      console.log('table-details schema--', resp_tableDetails.ResponseData.schema);
      if (resp_tableDetails.ResponseData.schema) {
        this.table_details_schema = resp_tableDetails.ResponseData.schema;
      }
    }
  }

  isDisabled: boolean = false;
  /** ------------------------------ *
   * This method for build a query
   */
  queryBuilder() {
    
    this.finalquery = "";
    let loop_length;
    // check the method type
    switch (String(this.selectedMethod).toUpperCase()) {
      case 'GET':
        
        if (this.selected_columns.includes('*')) {
          this.selected_columns = '*';
        } else {
          if (this.selected_columns.includes('*')) {
            this.selected_columns.splice(this.selected_columns.indexOf('*'), 1);
          }
        }        
        /* --- */
        // if (this.selected_columns.length > 0) {
        //   this.isDisabled = false;
        // } else {
        //   this.isDisabled = true;
        // }

        this.finalquery = `SELECT ${this.selected_columns } FROM ${this.selected_table ? this.selected_table : ''} `
        // place where condition 
        if (this.req_params.length > 0) {
          this.finalquery += 'WHERE '
        }
        loop_length = this.req_params.length;
        for (let i = 0; i < loop_length; i++) {
          let txtval: any = document.getElementById(this.req_params[i] + i)
          if ((this.operators[i] !== 'IS NULL' && this.operators[i] !== 'IS NOT NULL' && this.operators[i] !== 'IN') && this.operators[i]) {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i] + ' \'' + txtval?.value + '\'';
            if (this.logical_operators[i]) {
              this.finalquery += ' ' + this.logical_operators[i] + ' ';
            }
            /* for between */
            let txtval2: any = document.getElementById(this.req_params[i] + (i + 1))
            if (this.operators[i] === 'BETWEEN') {
              if (txtval?.value && txtval.value !== '') {
                const maxValue = txtval2?.value;
                if (this.logical_operators !== 'OR') {
                  this.finalquery += ` AND ` + ' \'' + maxValue + '\'';
                  // i++; 
                }
              } else {
                this.finalquery += ` `;
              }
            }
            /* --/ for between */
            // SELECT * FROM Customers WHERE Country IN ('Germany', 'France', 'UK'); 

          } else if (this.operators[i] === 'IS NULL') {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i];
          } else if (this.operators[i] === 'IS NOT NULL') {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i];
          }
          // else if (this.operators[i] === 'IN') {
          //   this.finalquery +=  this.req_params ;
          //   console.log('for IN operator - ',this.finalquery);
          // }
          /* --/ for IN operator */
          else {
            this.finalquery += this.req_params[i];
          }
        }

        break;
      case 'POST':
        this.finalquery = `INSERT INTO  ${this.selected_table ? this.selected_table : ''}`;
        // post column names
        if (this.postColumn.length > 0) {
          this.finalquery += ' ('
        }

        //add column names
        let loop = this.postColumn?.length;

        for (let i = 0; i < loop; i++) {
          // debugger
          if (i > 0) {
            this.finalquery += ',';
          }
          this.finalquery += this.postColumn[i];
        }
        if (this.postColumn.length > 0) {
          this.finalquery += ')'
        }
        this.finalquery += ' VALUES (';

        for (let i = 0; i < loop; i++) {
          // debugger
          let txtval: any = document.getElementById('body' + this.postColumn[i])
          if (i > 0) {
            this.finalquery += ',';
          }
          this.finalquery += ' \'' + `${txtval?.value ? txtval.value : ' '}` + '\' ';
        }
        this.finalquery += ')';

        break;
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
          if (this.operators[i]) {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i] + ' \'' + txtval?.value + '\'';
            if (this.logical_operators[i]) {
              this.finalquery += ' ' + this.logical_operators[i] + ' ';
            }
          }
          else {
            this.finalquery += this.req_params[i];
          }
        }
        break;
      case 'DELETE':
        this.finalquery = `DELETE FROM ${this.selected_table ? this.selected_table : ' '}`;
        // place where condition 
        if (this.req_params.length > 0) {
          this.finalquery += 'WHERE '
        }

        loop_length = this.req_params.length;
        for (let i = 0; i < loop_length; i++) {
          let txtval: any = document.getElementById(this.req_params[i] + i)
          if (this.operators[i]) {
            this.finalquery += this.req_params[i] + ' ' + this.operators[i] + ' \'' + txtval?.value + '\'';
            if (this.logical_operators[i]) {
              this.finalquery += ' ' + this.logical_operators[i] + ' ';
            }
          }
          else {
            this.finalquery += this.req_params[i];
          }
        }
        break;
      default:
        break;
    }
    this.finalquery += ';'
  }

  /** -------------------------- *
   * This method for run query
   */
  async runQuery() {
    this.db = this.commonService.getDB()
    this.query_outputs = null; // clear data
    let finalURL = environment.baseurl + 'getQueryData?query=' + this.finalquery + '&databaseName=' + this.db.dbName + '&host=' + this.db.ip;
    let apiOptions: IAPIOptions = { RequestMethod: RequestType.GET, RequestURL: finalURL }
    try {
      let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
      if (resp?.ResponseCode === 200) {
        this.query_outputs = resp?.ResponseData;
        this.output_table_headers = Object.keys(this.query_outputs[0])
        console.log('response data = ', Object.keys(this.query_outputs[0]));
      }
    } catch (error) { }
  }

  verifyQuery() {
    if(this.selected_columns.length === 0 || this.selected_table.length === 0) {
      Swal.fire("error", "please select column OR columns", "warning");
    } else if(this.selected_columns === 0 && this.selected_table === 0 ) {
      Swal.fire("error", "please select table and column", "warning");
    } else if(this.selected_columns.length !== 0 && this.selected_table.length !== 0) {
      Swal.fire("success", "query successfully run", "success");
      this.isVerfied == false;
    }
  }
  isVerfied: boolean = true

  /* 
  async testDBConn() {
    if (this.createDBConnForm.invalid) {
    } else {
      let finalUrl: string = environment.baseurl + 'connection';
      let apiOptions: IAPIOptions = {
        Headers: { 'Content-Type': 'application/json', token: 'test-my-token-authentication', },
        RequestMethod: RequestType.POST,
        RequestURL: finalUrl,
        RequestBody: this.createDBConnForm.value
      }
      try {
         let resp: any = await this.encryption_service.apiCaller(apiOptions, null);
         if (resp?.ResponseCode === 200) {
           Swal.fire("Success", "connection Successfully.", "success");
           console.log('response ', resp?.ResponseData.dbName);
           this.saveSubmitDBConn(resp?.ResponseData) 
           this.isDisabled = false;
           if (this.createDBConnForm !== undefined && this.createDBConnForm !== null) {
             this.dbList.push(resp?.ResponseData)
            }
          }
        } catch (error) {
          Swal.fire("error", "connection Failed", "error");
       }
    }
  }
  */

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
        break;
      case 'params':
        this.logical_operators = [];
        this.operators = [];
        this.selectedOperator = '';
        this.req_params = [];
        this.selectedUniqueColumn = [];
        this.logical_operators = [];
        break;
      default:
        break;
    }
  }

  addOperators: any = [];
  onSelectedOperators(Val: any) {
    if (Val == "AND" || Val == "OR") {
      if (this.logical_operators.length < this.req_params.length) {
        this.logical_operators.push(Val)
      } else {
        this.logical_operators[this.logical_operators.length - 1] = Val;
      }
    }
    else if (this.operators.length < this.req_params.length) {
      this.operators.push(Val)
    } else {
      this.operators[this.operators.length - 1] = Val;
    }
  }
  isOperatorButtonSelected: boolean = false;

  selectMethodSearchable(term: any, item: any) {
    item.text = item.text.replace(',', '');
    term = term.toLocaleLowerCase();
    return item.text.toLocaleLowerCase().indexOf(term) > -1;
  }

  seletedMethodType(val: any) {
    console.log(val);
    if (val != undefined) {
      this.selectedMethod = val.text;
      console.log(this.selectedMethod);
    } else {
      this.selectedMethod = '';
      console.log(this.selectedMethod);
    }
  }


  onTblJoin(val: any) {
    this.tableJoins = val;
    console.log('joins--', this.tableJoins);
  }

  onPostColumnSelected(val: any) {
    this.postColumn = val;
    console.log(this.postColumn);
    console.log(this.req_params);
  }

  onClickAdd(event: any) {
    const lastNum = this.dropdownsNumbers[this.dropdownsNumbers.length - 1];
    this.dropdownsNumbers.push(lastNum + 1);
    this.selectedJoinTable.push('');
    this.selectedJoinColumn.push('');
  }
  onClickRemove(event: any) {
    const lastNum = this.dropdownsNumbers[this.dropdownsNumbers.length - 1];
    this.dropdownsNumbers.pop(lastNum + 1);
    this.selectedJoinTable.pop('');
    this.selectedJoinColumn.pop('');
  }
  selectedValuecol: any = '*'

  //add one column to request parameters
  increament(keyName: any) {
    // this.selectedUniqueColumn.push(keyName);
    this.req_params.push(keyName);

    // this.params.push(keyName);
    // console.log('param',this.params);
    // let counter = 0;
    // for (let param of this.req_params) {
    //   if (param == keyName) {
    //     counter++;
    //   }
    // };
    // if(counter==1){
    //   this.req_params.push(keyName+'0');
    // } else {
    //   this.req_params.push(keyName+counter)
    // }
  }
  colInputForIN: any;
  forInput(col: any) {
    this.colInputForIN.push(col);
  }

  //remove one column from request parameters
  decrement(event: any) {
    // debugger
    let index = event.target.id;
    let param = this.req_params[index];
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
    document.getElementById(param + index)?.remove();
  }

  //select option from ng-select for request parameters
  addParam(event: any) {
    // console.log('event:', event)
    this.req_params.push(event);
  }

  //remove all occurences of a column from request parameters
  removeParam(event: any) {
    console.log('event:', event);
    for (let index = this.req_params.length; index >= 0; index--) {
      if (this.req_params[index] == event.label) {
        this.req_params.splice(index, 1);
        this.operators.splice(index, 1);
        if (this.logical_operators[index - 1]) {
          this.logical_operators.splice(index - 1, 1);
        }
      }
    };
  }

  //show add button for column in request parameter
  enableAdd(column: string, i: number) {
    if (this.req_params.indexOf(column) == i) {
      return true;
    } else {
      return false;
    }
  }

  //select all columns when using post method
  loadPostColumns() {
    if (this.selectedMethod == 'POST') {
      // this.postColumn = this.columnList; 
      this.postColumn = ['col1', 'col2', 'col3', 'col4']; //hard coded columns
    }
  }

  column_multiple: boolean = true;

  column_null(val: any) {
    // this.selected_columns = val
    // if (this.selected_columns.includes('*')) {
    //   this.selected_columns = ['*'];
    // } else {
    //   if (this.selected_columns.includes('*')) {
    //     this.selected_columns.splice(this.selected_columns.indexOf('*'), 1);
    //     console.log('my cols  ---', this.selected_columns);
        
    //   }
    // }
  }
}
