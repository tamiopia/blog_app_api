export class CreateCommentCommand {
    constructor(
      public readonly text: string,
      public readonly postId: string,
      public readonly userId: string,
    ) {}
  }
  