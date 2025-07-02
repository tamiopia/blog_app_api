export class CreatePostCommand {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly image: string,
    public readonly userId: string, // Add userId here
  ) {}
}
