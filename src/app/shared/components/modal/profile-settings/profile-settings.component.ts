import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/assets/core/data/class/user.class';
import {
  ModalConstant,
  ProfileSettings,
} from 'src/assets/core/data/constant/modal.constant';
import { UserService } from 'src/assets/core/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @Input('modalId') modalId: string = '';
  @Input('profileConst') profileConst: string = '';
  @Input('user') user?: User;
  username: string = '';
  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  repetePassword: string = '';
  warning: boolean = false;

  constructor(private userService: UserService) {}

  public get profileConstant(): typeof ProfileSettings {
    return ProfileSettings;
  }

  ngOnInit(): void {
    if (this.user === undefined) {
      this.user = this.userService.user;
    }
  }

  updateUser() {
    if (this.username != '') {
      this.user!.username = this.username;
    }
    if (this.email != '') {
      this.user!.email = this.email;
    }
    if (
      this.oldPassword != '' &&
      this.newPassword != '' &&
      this.repetePassword != ''
    ) {
      if (this.newPassword === this.repetePassword)
        this.user!.password = this.newPassword;
      else {
        this.warning = true;
        return;
      }
    }
    // DELETE PASSWORD
    this.user!.password = '';

    this.userService.user = this.user!;
    this.warning = false;
    var a = document.getElementById(ModalConstant.PROFILESETTINGS);
    setTimeout(() => {
      a?.classList.remove('show');
      a?.click();
      this.email = '';
      this.username = '';
      this.oldPassword = '';
      this.newPassword = '';
      this.repetePassword = '';
    }, 100);
  }

  validate(): boolean {
    let validate = false;
    if (
      this.oldPassword != '' &&
      this.newPassword != '' &&
      this.repetePassword != ''
    )
      validate = true;
    return validate;
  }
}