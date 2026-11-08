import { eventsAddAttendees } from "../funcs/events-add-attendees.js";
import { eventsCancelScreening } from "../funcs/events-cancel-screening.js";
import { eventsCreate } from "../funcs/events-create.js";
import { eventsDelete } from "../funcs/events-delete.js";
import { eventsGetAttendee } from "../funcs/events-get-attendee.js";
import { eventsGetScreening } from "../funcs/events-get-screening.js";
import { eventsGet } from "../funcs/events-get.js";
import { eventsListAttendees } from "../funcs/events-list-attendees.js";
import { eventsListScreenings } from "../funcs/events-list-screenings.js";
import { eventsList } from "../funcs/events-list.js";
import { eventsReviewAttendee } from "../funcs/events-review-attendee.js";
import { eventsStartScreening } from "../funcs/events-start-screening.js";
import { eventsUpdate } from "../funcs/events-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Events extends ClientSDK {
  /**
   * List an environment's events.
   *
   * @remarks
   * List this environment's events, newest first. Pass next_before back as before for the next page. Requires the events scope.
   */
  async list(
    request: operations.ListEventsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListEventsResponse> {
    return unwrapAsync(eventsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Create an event to screen.
   *
   * @remarks
   * Create an event to screen: its name, start, venue, host, the principals it protects and the sensitive topics posts are read against. An environment holds at most 1000 events.
   */
  async create(
    request: operations.CreateEventRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateEventResponse> {
    return unwrapAsync(eventsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read an event.
   *
   * @remarks
   * Read an event and how many attendees it holds.
   */
  async get(
    request: operations.GetEventRequest,
    options?: RequestOptions,
  ): Promise<operations.GetEventResponse> {
    return unwrapAsync(eventsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Change an event.
   *
   * @remarks
   * Change the fields you name. Send expected_version to apply the change only to that version.
   */
  async update(
    request: operations.UpdateEventRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateEventResponse> {
    return unwrapAsync(eventsUpdate(
      this,
      request,
      options,
    ));
  }

  /**
   * Erase an event.
   *
   * @remarks
   * Erase an event with its attendees, their decisions and its screenings, and stop any screening still running.
   */
  async delete(
    request: operations.DeleteEventRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteEventResponse | undefined> {
    return unwrapAsync(eventsDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * List an event's attendees.
   *
   * @remarks
   * Read an event's roster in upload order, with each attendee's match state, highest finding band and decision. Filter by band or decision; pass next_after back as after.
   */
  async listAttendees(
    request: operations.ListAttendeesRequest,
    options?: RequestOptions,
  ): Promise<operations.ListAttendeesResponse> {
    return unwrapAsync(eventsListAttendees(
      this,
      request,
      options,
    ));
  }

  /**
   * Add or update a batch of attendees.
   *
   * @remarks
   * Add or update 1 to 500 attendees with an Idempotency-Key. A row with the same external_id, else email, else phone as an existing attendee updates it. Identities are stored encrypted.
   */
  async addAttendees(
    request: operations.AddAttendeesRequest,
    options?: RequestOptions,
  ): Promise<operations.AddAttendeesResponse> {
    return unwrapAsync(eventsAddAttendees(
      this,
      request,
      options,
    ));
  }

  /**
   * Read an attendee's report.
   *
   * @remarks
   * Read an attendee's report: matched profiles, findings with their evidence and every recorded decision.
   */
  async getAttendee(
    request: operations.GetAttendeeRequest,
    options?: RequestOptions,
  ): Promise<operations.GetAttendeeResponse> {
    return unwrapAsync(eventsGetAttendee(
      this,
      request,
      options,
    ));
  }

  /**
   * Record a decision on an attendee.
   *
   * @remarks
   * Record a cleared, watch or escalated decision with a note. The latest decision is the attendee's; the next screening refreshes everyone on watch or escalated.
   */
  async reviewAttendee(
    request: operations.ReviewAttendeeRequest,
    options?: RequestOptions,
  ): Promise<operations.ReviewAttendeeResponse> {
    return unwrapAsync(eventsReviewAttendee(
      this,
      request,
      options,
    ));
  }

  /**
   * List an event's screenings.
   *
   * @remarks
   * List an event's screenings, newest first.
   */
  async listScreenings(
    request: operations.ListScreeningsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListScreeningsResponse> {
    return unwrapAsync(eventsListScreenings(
      this,
      request,
      options,
    ));
  }

  /**
   * Start a screening.
   *
   * @remarks
   * Start a screening of new attendees and everyone on watch or escalated, with an Idempotency-Key. It finishes completed, partial or failed minutes to hours later; poll it. The test environment screens with stand-ins that find no accounts.
   */
  async startScreening(
    request: operations.StartScreeningRequest,
    options?: RequestOptions,
  ): Promise<operations.StartScreeningResponse> {
    return unwrapAsync(eventsStartScreening(
      this,
      request,
      options,
    ));
  }

  /**
   * Read a screening.
   *
   * @remarks
   * Read a screening's status and progress.
   */
  async getScreening(
    request: operations.GetScreeningRequest,
    options?: RequestOptions,
  ): Promise<operations.GetScreeningResponse> {
    return unwrapAsync(eventsGetScreening(
      this,
      request,
      options,
    ));
  }

  /**
   * Cancel a screening.
   *
   * @remarks
   * Stop a queued or running screening. Attendees already screened keep their results.
   */
  async cancelScreening(
    request: operations.CancelScreeningRequest,
    options?: RequestOptions,
  ): Promise<operations.CancelScreeningResponse> {
    return unwrapAsync(eventsCancelScreening(
      this,
      request,
      options,
    ));
  }
}
