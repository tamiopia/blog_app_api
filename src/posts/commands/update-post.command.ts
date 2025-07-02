export class UpdatePostCommand {
    constructor(
      public readonly postId: string,
      public readonly title?: string,
      public readonly content?: string,
    ) {}
  }
  