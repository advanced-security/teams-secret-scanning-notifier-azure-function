import { Probot } from "probot";

export = (app: Probot) => {
  app.onAny(async (context) => {
    context.log(context.payload.installation.id);
    const oktokit = await auth(context.payload.installation.id);
    await oktokit.rest.repos.createDispatchEvent({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      event_type: context.name  
    });
  });
}
