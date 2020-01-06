import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.getMembers().subscribe((members) => (this.appService.members = members));
  }

  goToAddMemberForm() {
    this.router.navigate(['member']);
  }
  goToEditMemberForm(member: any) {
    this.router.navigate(['/member'], { queryParams: { id: member.id } });
  }
  deleteMember(member: any) {
    this.appService.deleteMembersById(member.id).subscribe((deleted) => {
      this.appService.getMembers().subscribe((members) => (this.appService.members = members));
    })
  }
}
