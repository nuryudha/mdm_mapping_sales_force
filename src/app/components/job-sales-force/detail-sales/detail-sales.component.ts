import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { listSalesForce } from 'src/app/models/job-sales-force-models/detail-sales-models/detail-sales-models';
import { TambahMappingSalesComponent } from './tambah-mapping-sales/tambah-mapping-sales.component';
import { MainService } from 'src/app/services/main.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-sales',
  templateUrl: './detail-sales.component.html',
  styleUrls: ['./detail-sales.component.css'],
})
export class DetailSalesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailSalesComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private services: MainService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any // Akses data dari tombol dialog
  ) {}

  ngOnInit(): void {
    this.formDetailSales();
    this.dataSource = new MatTableDataSource(
      this.dataYangDitampilkan_ListSalesForce
    );
    this.getDetailJobMappings();
    this.printIPAddress();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  ipAddress: any;

  displayedColumns: string[] = [
    'no',
    'channelCodeDesc',
    'salesForceTypeDesc',
    'action',
  ];

  form!: FormGroup;
  dataSource!: MatTableDataSource<listSalesForce>;
  dataYangDitampilkan_ListSalesForce: listSalesForce[] = [];

  formDetailSales() {
    this.form = this.formBuilder.group({
      codeJob: { value: this.data.jobCode, disabled: true },
    });
  }

  tambahMappingSales() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog';
    dialogConfig.width = '30%';
    // dialogConfig.height = '45%';
    dialogConfig.data = this.data.jobCode; // Mengirimkan data job code ke dialog menggunakan properti 'data'
    this.dialog
      .open(TambahMappingSalesComponent, dialogConfig)
      .afterClosed()
      .subscribe(
        (res) => {
          console.log(res);
          if (res && res.hasOwnProperty('status') && res.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.body.message,
              showConfirmButton: false,
              timer: 2000,
            }).then((res) => {
              this.getDetailJobMappings();
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDetailJobMappings() {
    this.dataYangDitampilkan_ListSalesForce = [];
    let channelCodeDesc: any;
    let salesForceTypeDesc: any;
    let parameter = {
      salesJobCode: this.data.jobCode,
    };
    this.services.postJob('job/getDetailJobMapping', parameter).subscribe(
      (res) => {
        console.log(res);
        res.body.data.forEach((element: any, index: number) => {
          if (element.channelCode == '01') {
            channelCodeDesc = 'DEALER';
          } else if (element.channelCode == '02') {
            channelCodeDesc = 'BMRI';
          } else if (element.channelCode == '03') {
            channelCodeDesc = 'MITRA MANDIRI';
          } else if (element.channelCode == '04') {
            channelCodeDesc = 'MUF';
          } else if (element.channelCode == '07') {
            channelCodeDesc = 'GROUP CUSTOMER';
          } else if (element.channelCode == '09') {
            channelCodeDesc = 'PERMATA';
          } else if (element.channelCode == '08') {
            channelCodeDesc = 'RESTRUCTURE';
          } else {
            channelCodeDesc = 'UNKNOWN';
          }

          if (element.salesForceType == '1') {
            salesForceTypeDesc = 'INTERNAL';
          } else if (element.salesForceType == '2') {
            salesForceTypeDesc = 'EXTERNAL 1';
          } else if (element.salesForceType == '3') {
            salesForceTypeDesc = 'EXTERNAL 2';
          } else if (element.salesForceType == '4') {
            salesForceTypeDesc = 'MITRA';
          } else if (element.salesForceType == '5') {
            salesForceTypeDesc = 'EXTERNAL 3';
          } else if (element.salesForceType == '6') {
            salesForceTypeDesc = 'INTERNAL 2,';
          } else if (element.salesForceType == '7') {
            salesForceTypeDesc = 'INTERNAL 3';
          } else {
            salesForceTypeDesc = 'UNKNOWN';
          }
          this.dataYangDitampilkan_ListSalesForce.push({
            no: index + 1,
            channelCodeDesc: channelCodeDesc,
            channelCode: element.channelCode,
            salesForceTypeDesc: salesForceTypeDesc,
            salesForceType: element.salesForceType,
            deleted: element.deleted,
          });
        });

        this.dataSource = new MatTableDataSource(
          this.dataYangDitampilkan_ListSalesForce
        );
        this.ngAfterViewInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeStatusDelete(status: any) {
    let statusDelete: any;
    if (status.deleted == 1) {
      statusDelete = '0';
      Swal.fire({
        position: 'center',
        icon: 'question',
        title: 'Apakah anda yakin ingin menonaktifkan ?',
        html: `
        Channel Code: ${status.channelCodeDesc} <br>
        Sales Type: ${status.salesForceTypeDesc}
      `,
        showConfirmButton: true,
        confirmButtonText: 'Ya',
        confirmButtonColor: '#4758b8',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        cancelButtonColor: '#f44336',
      }).then((res) => {
        if (res.isConfirmed) {
          this.activeOrNonActive(status, statusDelete);
        } else {
        }
      });
    } else if (status.deleted == 0) {
      statusDelete = '1';
      Swal.fire({
        position: 'center',
        icon: 'question',
        title: 'Apakah anda yakin ingin mengaktifkan ?',
        html: `
        Channel Code: ${status.channelCodeDesc} <br>
        Sales Type: ${status.salesForceTypeDesc}
      `,
        showConfirmButton: true,
        confirmButtonText: 'Ya',
        confirmButtonColor: '#4758b8',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        cancelButtonColor: '#f44336',
      }).then((res) => {
        if (res.isConfirmed) {
          this.activeOrNonActive(status, statusDelete);
        } else {
        }
      });
    }
  }

  getIPAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  printIPAddress() {
    this.getIPAddress().subscribe((response: any) => {
      this.ipAddress = response.ip;
    });
  }

  activeOrNonActive(status: any, statusDelete: any) {
    let parameter = {
      salesJobCode: this.data.jobCode,
      channelCode: status.channelCode,
      salesForceType: status.salesForceType,
      deleted: statusDelete,
      userId: '20014016',
      ipAddr: this.ipAddress,
      branchCode: '0000',
    };
    this.services.postJob('job/activationMappingJob', parameter).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.body.message,
          showConfirmButton: false,
          timer: 2500,
        });
        this.getDetailJobMappings();
      },
      (err) => {
        console.log(err);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,

          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Service Unavailable',
        });
      }
    );
  }

  closeDetailJob() {
    this.dialogRef.close();
  }
}
