import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {AlertsService} from 'angular-alert-module';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public closeResult: string;
  public selectedData: any;
  SignupForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  public btnflag: boolean;

  constructor(public modalService: NgbModal, public formBuilder: FormBuilder) {
  }

  contactList: any = [];
  contactListTemp: any = [];
  singleContactList: any;

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });


    this.contactList = [{
      id: 1,
      name: 'murali',
      phone: '979032727',
      email: 'muralidharan@gmail.com',
      company: 'xyz technologies',
      address: 'chennai'
    },
      {
        id: 2,
        name: 'karthi',
        phone: '9080101058',
        email: 'karthi@gmail.com',
        company: 'ABC technologies',
        address: 'salem'
      }];
    this.selectedData = this.contactList;
    this.contactListTemp = this.contactList;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.addContact();
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  }

  addContact() {
    console.log(this.registerForm.value);
    const value = {
      id: this.contactList.length + 1,
      name: this.registerForm.controls.firstName.value,
      phone: this.registerForm.controls.phone.value,
      email: this.registerForm.controls.email.value,
      company: this.registerForm.controls.companyName.value,
      address: this.registerForm.controls.address.value
    };

    this.contactList.push(value);
    this.contactListTemp = this.contactList;
    this.cancel();
  }

  viewContact(id) {
    this.selectedData = this.contactList.filter(
      data => data.id === id);
    console.log(this.selectedData);

  }

  open_model(arg) {
    this.submitted = false;
    this.registerForm.reset();
    this.btnflag = true;
    this.modalService.open(arg, {
      windowClass: 'adduser-model',
      centered: true,
      backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  cancel() {
    this.submitted = false;
    this.registerForm.reset();
    this.modalService.dismissAll();
  }

  searchFunc(val) {
    val = val.toLowerCase();
    this.contactList = this.contactList.filter(item => item.name.toLowerCase().indexOf(val) !== -1 ||
      item.email.toLowerCase().indexOf(val) !== -1 || item.phone.toLowerCase().indexOf(val) !== -1);

    if (val.length == 0) {
      this.contactList = this.contactListTemp;
    }
  }

  contact_edit(arg) {
    this.submitted = false;
    this.btnflag = false;
    this.registerForm.setValue({
      // index: i,
      firstName: this.selectedData[0].name,
      address: this.selectedData[0].address,
      phone: this.selectedData[0].phone,
      email: this.selectedData[0].email,
      companyName: this.selectedData[0].company,
    });
    this.modalService.open(arg, {
      windowClass: 'adduser-model',
      centered: true,
      backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });

  }

  update_contact() {
    const value = {
      id: this.selectedData[0].id,
      name: this.registerForm.controls.firstName.value,
      phone: this.registerForm.controls.phone.value,
      email: this.registerForm.controls.email.value,
      company: this.registerForm.controls.companyName.value,
      address: this.registerForm.controls.address.value
    };
    this.contactList[value.id - 1] = value;
    this.selectedData = [];
    this.selectedData.push(value);
    this.contactListTemp = this.contactList;
    this.cancel();

  }

  numberOnly(e): boolean {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
    // if (e.which != 46 && e.which != 45 && e.which != 46 &&
    // 	!(e.which >= 48 && e.which <= 57)) {
    // 	return false;
    // }
  }
}
