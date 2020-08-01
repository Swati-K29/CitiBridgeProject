import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Transaction } from 'src/app/models/transaction';
import { MessageService, SelectItem } from 'primeng';
import { TransactionService } from 'src/app/services/transaction.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  fileToUpload: File;
  receivedTransactions: Transaction[] = [];
  keywordToAdd: string;
  allTransactionsValidateFailed: boolean = false;
  showTable: boolean = false;
  showFileUpload: boolean = true;
  showLoader: boolean = false;
  isUpload : boolean = false;
  statusList: SelectItem[] = [
    { label: 'Validate Pass', value: 'VALIDATE_PASS' },
    { label: 'Validate Fail', value: 'VALIDATE_FAIL' },
    { label: 'Screen Pass', value: 'SCREEN_PASS' },
    { label: 'Screen Fail', value: 'SCREEN_FAIL' }

  ];
  columns = [
    { field: 'transRef', header: 'Transaction Reference' },
    { field: 'date', header: 'Date' },
    { field: 'payerName', header: 'Payer Name' },
    { field: 'payerAcc', header: 'Payer Account' },
    { field: 'payeeName', header: 'Payee Name' },
    { field: 'payeeAcc', header: 'Payee Acccount ' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' }

  ];

  constructor(private fileService: UploadService,
    private messageService: MessageService,
    private transactionService: TransactionService) { }

  ngOnInit() {

  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  toggleShowTable() {
    this.showFileUpload = true;
    this.showTable = false;
    this.showLoader = false;
    this.keywordToAdd='';
    this.isUpload = false;
    this.fileToUpload = null;
    this.receivedTransactions = [];
  }

  onSubmit(Image: any) {
    
    this.receivedTransactions = [];
    if (this.fileToUpload && this.fileToUpload.size > 0 /* && this.fileToUpload.name.match("Transaction\\d{1,}\\.xl*")*/) {
      this.isUpload = true;
      this.fileService.postFile(this.fileToUpload).subscribe(
        (result: Transaction[]) => {
          if(result && result.length > 0) {
            this.receivedTransactions = result;
            let _filteredTransactions: Transaction[] = this.receivedTransactions.filter(item => item.status !== "VALIDATE_FAIL");
            
            this.allTransactionsValidateFailed = _filteredTransactions.length > 0 ? false : true;
            
           }
          
          this.showTable = true;
          this.showFileUpload = false;
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please upload a valid excel file' });
    }
  }


  addKeyword() {//to add a new keyword to the DB
    this.fileService.addKeyword(this.keywordToAdd)
      .subscribe((result) => {
        if (result) {
          this.keywordToAdd='';
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Keyword added successfully' });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Failed to add keyword' });
        }
      }, err => {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Failed to add keyword' });
      })
  }

  screenAllTransactions() { //to screen all Transactions
    this.showTable = false;
    this.showLoader = true;
    let _filteredTransactions: Transaction[] = this.receivedTransactions.filter((item => item.status === "VALIDATE_PASS")
    );
    this.screenTransactions(_filteredTransactions);
  }

  screen(rowData) { // to screen individual transactions
    this.showTable = false;
    this.showLoader = true;
    let _transactions: Transaction[] = [];
    _transactions.push(rowData);
    this.screenTransactions(_transactions);
  }

  screenTransactions(transactions: Transaction[]) {

    this.transactionService.screenTransactions(transactions).subscribe((result: Transaction[]) => {
      this.showLoader = false;
      result.forEach((resultItem) => {
        
        this.receivedTransactions.forEach((trans) => {
          if (trans.transRef === resultItem.transRef) {
            trans.status = resultItem.status;
          }

        });
        

        
      });
      this.showTable = true;
    }, err => {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Failed to screen' });
    });
  }
}
