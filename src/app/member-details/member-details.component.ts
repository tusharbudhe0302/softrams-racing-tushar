import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  id: number;
  tittle: string;
  constructor(private fb: FormBuilder, public appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.memberForm = this.fb.group({
      id: this.id,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.appService.getTeams().subscribe((teams) => (this.teams = teams));
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = +params['id'] || -1;
        console.log(` this.id  : ${this.id}`);
        if (this.id > 0) {
          this.tittle = "Edit";
          this.appService.getMembersById(this.id).subscribe((member) => {
            this.memberModel = member;
            this.memberForm.setValue(member);
          })
        } else {
          this.tittle = "Add";
        }
      });
  }

  ngOnChanges() { }

  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.id > 0) {
      this.appService.editMemberByID(this.id, this.memberModel)
        .subscribe((member) => {
          this.router.navigate(['members']);
        });
    } else {
      this.appService.addMember(this.memberModel)
        .subscribe((member) => {
          this.router.navigate(['members']);
        });
    }
  }
}
