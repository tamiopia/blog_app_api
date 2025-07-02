export class EditCommentCommand {
    constructor(
      public readonly commentId: string,
      public readonly userId: string,
      public readonly newText: string,
    ) {}
  }