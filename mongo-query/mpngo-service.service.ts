import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../UserModule/user/auth/auth.service';
import { Constantvalue } from '../constantvalue';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MpngoServiceService {

  constructor(private http:HttpClient,private auth:AuthService) { }


    
    
 getMongoDbName(){

   let url =Constantvalue.baseUrl+ "api/mongo/getMappingDB";
   var httpParams = new HttpParams();
 

   var httpHeaders = new HttpHeaders().append("Authorization", "Bearer " + this.auth.getAccessToken())
   const httpOptions = {
    observe: 'response' as 'response',
    params: httpParams,
    headers:httpHeaders
 };

 return this.http.get(url,httpOptions);
  

  }
  getMongoFieldName(collectionName){

    let url =Constantvalue.baseUrl+ "api/mongo/getClassField";
    var httpParams = new HttpParams();
    httpParams =  httpParams.append("dbName",collectionName);

    var httpHeaders = new HttpHeaders().append("Authorization", "Bearer " + this.auth.getAccessToken())
    
    const httpOptions = {
     observe: 'response' as 'response',
     params: httpParams,
     headers:httpHeaders
  };
 
  return this.http.get(url,httpOptions);
   
 
   }

   fireQuery(data){
    let url =Constantvalue.baseUrl+ "api/mongo/queryFire";
    var httpHeaders = new HttpHeaders().append("Authorization", "Bearer " + this.auth.getAccessToken()).append("Content-Type","application/json")

    const httpOptions={
      observe:"response" as "response",
      headers:httpHeaders
      // params:httpParams
      
    };
    return this.http.post(url,JSON.stringify(data),httpOptions);
  } 


}
