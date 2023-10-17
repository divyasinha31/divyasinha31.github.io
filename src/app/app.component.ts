import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { iComment, iReply } from './app-model';
import { CommentService } from './comment.service';
import { EDIT_BY, HEADING, REPLY_TO } from './constants';
import { iCallAPIReq, iCallAPIResp, iGetCommentsResp } from './api-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  commentForm: FormGroup;
  comments: iComment[];
  heading: string;

  private currentReplyIndex: number | undefined;
  private currentEditIndex: number | undefined;
  private subscription: Observable<iCallAPIResp>;

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService) {
    this.commentForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    });

    this.heading = HEADING;
  }

  // Angular lifecycle hooks
  ngOnInit(): void {
    this.getComments();
  }

  // Private methods
  private async getComments() {
    this.commentService.getComments().subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
    });
  }

  private async addNewComment() {
    const comment: iComment = {
      name: this.commentForm.controls['name'].value,
      comment: this.commentForm.controls['comment'].value,
      time: Date.now(),
      showReply: false,
      replies: []
    };
    this.comments.push(comment);

    const params: iCallAPIReq = {
      comments : this.comments
    };

    this.commentService.updateComment(params).subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
    });
  }

  private async updateComment() {
    const comment: iComment = {
      name: this.commentForm.controls['name'].value,
      comment: this.commentForm.controls['comment'].value,
      time: Date.now(),
      showReply: false,
      replies: this.comments[this.currentEditIndex as number].replies
    }
    this.comments[this.currentEditIndex as number] = comment;

    const params: iCallAPIReq = {
      comments : this.comments
    };

    this.commentService.updateComment(params).subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
    });

    this.currentEditIndex = undefined;
  }

  private async addReply() {
    const reply: iReply  = {
      name: this.commentForm.controls['name'].value,
      reply: this.commentForm.controls['comment'].value
    }
    this.comments[this.currentReplyIndex as number].replies?.push(reply);

    const params: iCallAPIReq = {
      comments : this.comments
    };

    this.commentService.updateComment(params).subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
    });

    this.currentReplyIndex = undefined;
  }

  private clearForm() {
    this.commentForm.reset();
    this.heading = HEADING;
  }

  // HTML functions
  openReply(index: number) {
    this.heading = REPLY_TO.concat(this.comments[index].name);
    this.currentReplyIndex = index;
  }

  editComment(index: number, comment: iComment) {
    this.heading = EDIT_BY.concat(this.comments[index].name);
    this.currentEditIndex = index;

    this.commentForm.controls['name'].setValue(comment.name);
    this.commentForm.controls['comment'].setValue(comment.comment);
  }

  post() {
    if (this.currentReplyIndex !== undefined) {
      this.addReply();
    } else if (this.currentEditIndex !== undefined) {
      this.updateComment();
    } else {
      this.addNewComment();
    }

    this.clearForm();
  }
}
