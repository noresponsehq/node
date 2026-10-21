import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import * as types from "../../types/primitives.js";
import * as models from "../index.js";
import { NoResponseError } from "./no-response-error.js";

/**
 * HTTP 403 problem document.
 */
export type PermissionDeniedErrorData = {
  type: string;
  title: string;
  status: 403;
  detail: string;
  instance?: string | undefined;
  /**
   * Machine codes an HTTP 403 answer can carry.
   */
  code: models.PermissionDeniedErrorCode;
  requestId: string;
  invalidParams?: Array<models.ProblemInvalidParam> | undefined;
};

/**
 * HTTP 403 problem document.
 */
export class PermissionDeniedError extends NoResponseError {
  type: string;
  title: string;
  status: 403;
  detail: string;
  instance?: string | undefined;
  /**
   * Machine codes an HTTP 403 answer can carry.
   */
  code: models.PermissionDeniedErrorCode;
  requestId: string;
  invalidParams?: Array<models.ProblemInvalidParam> | undefined;

  /** The original data that was passed to this error instance. */
  data$: PermissionDeniedErrorData;

  constructor(
    err: PermissionDeniedErrorData,
    httpMeta: { response: Response; request: Request; body: string },
  ) {
    const message = "message" in err && typeof err.message === "string"
      ? err.message
      : `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.type = err.type;
    this.title = err.title;
    this.status = err.status;
    this.detail = err.detail;
    if (err.instance != null) this.instance = err.instance;
    this.code = err.code;
    this.requestId = err.requestId;
    if (err.invalidParams != null) this.invalidParams = err.invalidParams;

    this.name = "PermissionDeniedError";
  }
}

/** @internal */
export const PermissionDeniedError$inboundSchema: z.ZodMiniType<
  PermissionDeniedError,
  unknown
> = z.pipe(
  z.object({
    type: types.string(),
    title: types.string(),
    status: types.literal(403),
    detail: types.string(),
    instance: types.optional(types.string()),
    code: models.PermissionDeniedErrorCode$inboundSchema,
    request_id: types.string(),
    invalid_params: types.optional(
      z.array(models.ProblemInvalidParam$inboundSchema),
    ),
    request$: z.custom<Request>(x => x instanceof Request),
    response$: z.custom<Response>(x => x instanceof Response),
    body$: z.string(),
  }),
  z.transform((v) => {
    const remapped = remap$(v, {
      "request_id": "requestId",
      "invalid_params": "invalidParams",
    });

    return new PermissionDeniedError(remapped, {
      request: v.request$,
      response: v.response$,
      body: v.body$,
    });
  }),
);
