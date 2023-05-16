import { Component, Input, OnInit } from '@angular/core';
import { UtilsException } from 'src/assets/core/data/class/error';
import { GithubIssues } from 'src/assets/core/data/class/user.class';
import { ModalConstant } from 'src/assets/core/data/constant/constant';
import { SwalIcon } from 'src/assets/core/data/constant/swal.icon';
import { UserService } from 'src/assets/core/services/user.service';
import { SwalService } from 'src/assets/core/utils/swal.service';

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.scss'],
})
export class ReportBugComponent implements OnInit {
  @Input('modalId') modalId: string = '';
  @Input('exception') exception?: UtilsException;
  description: string = '';

  constructor(private swal: SwalService, private userService: UserService) {}

  public get modalConstant(): typeof ModalConstant {
    return ModalConstant;
  }

  ngOnInit(): void {}

  reportBug() {
    let githubIssues = new GithubIssues();
    githubIssues.title =
      '[' +
      this.exception?.error?.exceptionCode +
      ']: ' +
      this.exception?.error?.exceptionName;
    githubIssues.assignees = ['giovannilamarmora'];
    githubIssues.labels = ['bug'];
    this.userService.getTemplate().subscribe((t) => {
      let template = t.template
        .replace('$DATETIME$', this.exception!.dateTime!.toString())
        .replace('$URL$', this.exception!.url!)
        .replace('$EXCEPTION_CODE$', this.exception?.error?.exceptionCode)
        .replace('$STATUS$', this.exception?.error?.statusCode!)
        .replace('$MESSAGE$', this.exception?.error?.message!)
        .replace(
          '$BODY$',
          JSON.stringify(this.exception)
            .replace(',', ',<br>')
            .replace('{', '{<br>')
            .replace('}', '}<br>')
        )
        .replace(
          '$DESCRIPTION$',
          this.description +
            (this.exception?.error?.stackTrace
              ? '<hr> <h1>Stacktrace:</h1> <br>' +
                this.exception.error.stackTrace
              : '')
        );
      githubIssues.body = template;
      this.userService.openIssues(githubIssues).subscribe((res) => {
        this.swal.toastMessage(SwalIcon.SUCCESS, res.message!);
      });
    });
  }
}