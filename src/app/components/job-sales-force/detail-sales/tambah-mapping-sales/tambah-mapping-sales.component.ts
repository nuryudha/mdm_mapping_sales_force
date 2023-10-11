import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  listChannelCode,
  listSalesForceType,
} from 'src/app/models/job-sales-force-models/detail-sales-models/tambah-mapping-sales-models/tambah-mapping-sales-models';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tambah-mapping-sales',
  templateUrl: './tambah-mapping-sales.component.html',
  styleUrls: ['./tambah-mapping-sales.component.css'],
})
export class TambahMappingSalesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TambahMappingSalesComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private services: MainService,
    @Inject(MAT_DIALOG_DATA) public jobCode: any // Akses data dari tombol dialog
  ) {}

  ngOnInit(): void {
    this.formTambahMapping();
    this.getDataOptionChannelCode();
    this.getDataOptionSalesForce();
    this.printIPAddress();
  }

  ipAddress: any;

  form!: FormGroup;

  dataOption_ListChannelCode: listChannelCode[] = [];
  filteredListChannelCode: any = this.dataOption_ListChannelCode;

  dataOption_SalesForceType: listSalesForceType[] = [];
  filteredListSalesForceType: any = this.dataOption_SalesForceType;

  formTambahMapping() {
    this.form = this.formBuilder.group({
      channelCode: ['', [Validators.required]],
      salesForce: ['', [Validators.required]],
    });
  }

  getDataOptionChannelCode() {
    let arrayDataOption_ListChannelCode: listChannelCode[] = [
      // INI HARUSNYA KOSONG  dan masuk ke service terus di foreach
      {
        channelCode: '01',
        channelCodeDesc: 'DEALER',
      },
      {
        channelCode: '02',
        channelCodeDesc: 'BMRI',
      },
      {
        channelCode: '04',
        channelCodeDesc: 'MITRA MANDIRI',
      },
      {
        channelCode: '04',
        channelCodeDesc: 'MUF',
      },
      {
        channelCode: '07',
        channelCodeDesc: 'GROUP CUSTOMER',
      },
      {
        channelCode: '09',
        channelCodeDesc: 'PERMATA',
      },
      {
        channelCode: '08',
        channelCodeDesc: 'RESTRUCTURE',
      },
    ];
    this.dataOption_ListChannelCode = arrayDataOption_ListChannelCode;
    this.filteredListChannelCode = this.dataOption_ListChannelCode;
  }

  getDataOptionSalesForce() {
    let arrayDataOption_SalesForceType: listSalesForceType[] = [
      // ! Hard Code
      {
        salesForceType: '1',
        salesForceTypeDesc: 'INTERNAL',
      },
      {
        salesForceType: '2',
        salesForceTypeDesc: 'EXTERNAL 1',
      },
      {
        salesForceType: '3',
        salesForceTypeDesc: 'EXTERNAL 2',
      },
      {
        salesForceType: '4',
        salesForceTypeDesc: 'MITRA',
      },
      {
        salesForceType: '5',
        salesForceTypeDesc: 'EXTERNAL 3',
      },
      {
        salesForceType: '6',
        salesForceTypeDesc: 'INTERNAL 2',
      },
      {
        salesForceType: '7',
        salesForceTypeDesc: 'INTERNAL 3',
      },
    ];
    this.dataOption_SalesForceType = arrayDataOption_SalesForceType;
    this.filteredListSalesForceType = this.dataOption_SalesForceType;
  }

  getIPAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  printIPAddress() {
    this.getIPAddress().subscribe((response: any) => {
      this.ipAddress = response.ip;
    });
  }

  saveMapping() {
    if (this.form.invalid) {
      if (this.form.controls.channelCode.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong pilih Channel Code',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (this.form.controls.salesForce.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong pilih Sales Force Type',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      let parameter = {
        salesJobCode: this.jobCode,
        channelCode: this.form.value.channelCode,
        salesForceType: this.form.value.salesForce,
        deleted: '0',
        userId: '20014016',
        ipAddr: this.ipAddress,
        branchCode: '0000',
      };
      console.log(parameter);
      this.services.postJob('job/insertMappingJob', parameter).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close(res);
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: err.error.message,
            showConfirmButton: true,
          }).then((res) => {
            this.form.get('channelCode')?.setValue('');
            this.form.get('channelCode')?.markAsUntouched();
            this.form.get('salesForce')?.setValue('');
            this.form.get('salesForce')?.markAsUntouched();
          });
        }
      );
    }
  }

  closeTambahMapping() {
    this.dialogRef.close();
  }
}
