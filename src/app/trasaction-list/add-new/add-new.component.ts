import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  form: FormGroup;
  @Input() isLoading = false;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  @Output() submitTrn = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.initForm();
  }
  onSubmit(){
    if (this.form.valid){
      const {to, amount, from} = this.form.value;
      this.submitTrn.emit({
        date: new Date(), beneficiaryName: to,
        paymentType: from, amount
      });
      this.formGroupDirective.resetForm();
    }
  }
  initForm() {
    this.form = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      amount: [null, Validators.required]
    });
  }

}
