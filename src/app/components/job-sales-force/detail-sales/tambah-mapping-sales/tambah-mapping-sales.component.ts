import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tambah-mapping-sales',
  templateUrl: './tambah-mapping-sales.component.html',
  styleUrls: ['./tambah-mapping-sales.component.css'],
})
export class TambahMappingSalesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TambahMappingSalesComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formTambahMapping();
  }

  form!: FormGroup;

  formTambahMapping() {
    this.form = this.formBuilder.group({
      channelCode: [''],
      salesForce: [''],
    });
  }

  closeTambahMapping() {
    this.dialogRef.close();
  }
}
