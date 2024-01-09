import { Probot } from "probot";
// import * as fs from 'fs';
// import * as yaml from 'yaml';

// // read in filter config, from a YAML file called "filter.yml" in the root of the repo
// // if the file doesn't exist, or is invalid YAML, we handle that gracefully
// let filter_config: any;

// try {
//   yaml.parse(fs.readFileSync('filter.yml', 'utf8'));
// } catch (error) {
//   console.log(error);
// }

const setupApp = (app: Probot) => {
  app.onAny(async (context: any) => {
    const octokit = await app.auth(context.payload.installation.id);

    // if (filter(context)) {
    await octokit.repos.createDispatchEvent({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      event_type: context.name,
      client_payload: context.payload,
    });
    // }
  });
};

// const filter = (context: any): boolean => {
//   if (filter_config === undefined) return true;

//   const event_name = context.name;

//   // check if the event type is allowed by the filter config
//   // if there is an include list, and this type isn't on it, return false
//   // if there is a matching entry in the excludes, and there are no more details under that entry, return false
//   if (filter_config.include !== undefined && !(event_name in filter_config.include)
//     || filter_config.exclude !== undefined && event_name in filter_config.exclude && Object.keys(filter_config.exclude).length === 0
//   ) return false;

//   // check the event payload against the filter config's include rule, if it exists
//   const include_filter = filter_config.include[event_name];
//   const payload = context.payload;

//   if (include_filter !== undefined) {

//     const matches = Object.keys(include_filter).every(key => {
//       if (typeof include_filter[key] === typeof (String)) return payload[key] === include_filter[key];
//       if (typeof include_filter[key] === typeof (Array)) return payload[key] in include_filter[key];
//       return false;
//     });

//     if (!matches) return false;
//   }

//   // same for the exclude rule
//   const exclude_filter = filter_config.exclude[event_name];

//   if (exclude_filter !== undefined) {
//     const matches = Object.keys(exclude_filter).every(key => {
//       if (typeof exclude_filter[key] === typeof (String)) return payload[key] === exclude_filter[key];
//       if (typeof exclude_filter[key] === typeof (Array)) return payload[key] in exclude_filter[key];
//       return false;
//     });

//     if (matches) return false;
//   }

//   return true;
// }

export default setupApp;
