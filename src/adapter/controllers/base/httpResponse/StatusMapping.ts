import applicationStatus from "../../../../application/shared/status/applicationStatusCodes";
import httpStatus from "./httpStatus";

const statusMapping: { [key: string]: number } = {};

statusMapping[applicationStatus.SUCCESS] = httpStatus.SUCCESS;
statusMapping[applicationStatus.CREATED] = httpStatus.CREATED;
statusMapping[applicationStatus.NO_CONTENT] = httpStatus.NOT_CONTENT;
statusMapping[applicationStatus.BAD_REQUEST] = httpStatus.BAD_REQUEST;
statusMapping[applicationStatus.UNAUTHORIZED] = httpStatus.SUCCESS;
statusMapping[applicationStatus.NOT_FOUND] = httpStatus.NOT_FOUND;
statusMapping[applicationStatus.INTERNAL_ERROR] = httpStatus.INTERNAL_SERVER_ERROR;

export default statusMapping;
