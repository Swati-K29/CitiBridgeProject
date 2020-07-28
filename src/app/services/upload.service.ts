import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
serviceUrl = "http://192.168.43.124:8080";
  
  constructor(private http:HttpClient) { }
 
  postFile(fileToUpload:File){
 
    const formData: FormData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    return this.http.post<Transaction[]>(this.serviceUrl + "/UploadFile",formData);
  }
getAll(){
  return this.http.get(this.serviceUrl+ "/getAllKeywords");
}

addKeyword(keyword:string){
return this.http.post(this.serviceUrl+"/addKeyword",keyword);
}
}
