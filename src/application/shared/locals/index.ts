import { Resources } from "resources-tsk";
import * as ptLocal from "./pt.local.json";
import * as enLocal from "./en.local.json";

import * as localKeys from "./keys.json";

const locals = {
  pt: ptLocal,
  en: enLocal,
};

const resourceKeys = localKeys;

const resources = new Resources(locals, localKeys);

export { resourceKeys, Resources };

export default resources;
