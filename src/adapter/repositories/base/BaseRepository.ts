import resources, { resourceKeys, Resources } from "@/application/shared/locals";
export { ApplicationError } from "@/application/shared/errors/ApplicationError";
import applicationStatus from "@/application/shared/status/applicationStatusCodes";
import { Validator } from "validator-tsk";
import mapper, { IMap } from "mapper-tsk";

export class BaseRepository {
  constructor() {
    this.mapper = mapper;
    this.resources = resources;
    this.validator = new Validator(
      resources,
      resourceKeys.SOME_PARAMETERS_ARE_MISSING,
      applicationStatus.BAD_REQUEST,
    );
  }

  mapper: IMap;
  validator: Validator;
  resources: Resources;
  resourceKeys = resourceKeys;
  applicationStatusCode = applicationStatus;
}
