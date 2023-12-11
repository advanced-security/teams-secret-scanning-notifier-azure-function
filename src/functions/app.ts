import { Probot } from "probot";
import * as fs from 'fs';
import * as yaml from 'yaml';

// read in filter config, from a YAML file called "filter.yml" in the root of the repo
// if the file doesn't exist, or is invalid YAML, we handle that gracefully
let filter_config: any;

try {
  yaml.parse(fs.readFileSync('filter.yml', 'utf8'));
} catch (error) {
  console.log(error);
}

const setupApp = (app: Probot) => {
  app.onAny(async (context: any) => {
    const octokit = await app.auth(context.payload.installation.id);

    if (filter(context)) {
      await octokit.repos.createDispatchEvent({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        event_type: context.name
      });
    }
  });
};

const filter = (context: any): boolean => {
  if (filter_config === undefined) return true;

  const event_name = context.name;

  // check if the event type is allowed by the filter config
  if (filter_config.include !== undefined && !(event_name in filter_config.include) || filter_config.exclude !== undefined && event_name in filter_config.exclude) return false;

  // check the event payload against the filter config
  const filter = filter_config.include[event_name];

  if (filter !== undefined) {
    const payload = context.payload;
    const matches = Object.keys(filter).every(key => {
      if (typeof filter[key] === typeof (String)) return payload[key] === filter[key];
      if (typeof filter[key] === typeof (Array)) return payload[key] in filter[key];
      return false;
    });

    if (!matches) return false;
  }

  return true;
}

export default setupApp;
