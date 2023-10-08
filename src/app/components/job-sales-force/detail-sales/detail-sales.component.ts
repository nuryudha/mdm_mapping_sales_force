import { Component, Inject, OnInit } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data: any // Akses data dari tombol dialog
  ) {}

  ngOnInit(): void {
    this.formDetailSales();
    this.dataSource = new MatTableDataSource(
      this.dataYangDitampilkan_ListSalesForce
    );
    console.log(this.data);
  }

  displayedColumns: string[] = [
    'no',
    'emplChannelCode',
    'emplSalesForce',
    'action',
  ];

  form!: FormGroup;
  dataSource!: MatTableDataSource<listSalesForce>;
  dataYangDitampilkan_ListSalesForce: listSalesForce[] = [
    {
      no: 1,
      emplChannelCode: 'MUF',
      emplSalesForce: 'Internal 1',
    },
    {
      no: 2,
      emplChannelCode: 'MUF',
      emplSalesForce: 'Eksternal 1',
    },
  ];

  formDetailSales() {
    this.form = this.formBuilder.group({
      codeJob: { value: 'MKA', disabled: true },
      search: { value: '' },
    });
  }

  tambahMappingSales() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '45%';
    this.dialog
      .open(TambahMappingSalesComponent, dialogConfig)
      .afterClosed()
      .subscribe(
        (res) => {
          console.log(res);
          console.log(res.body.message);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  closeDetailJob() {
    this.dialogRef.close();
  }
}
