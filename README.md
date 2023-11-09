# azure-probot-template

Edit `src/functions/app.ts` as required:

```ts
export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
```

Create a GitHub app and install it on a repo, then deploy this repo to an Azure Function with the following application settings:

```
APP_ID=.....
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n.....
WEBHOOK_SECRET=.....
```
