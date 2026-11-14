import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Which common field a value is, where many sources share it: a join date and a birth date are both dates, with the roles joined and born. A platform account's field and a breach row's column with the same meaning carry the same kind and role. A linked_account field is named by its network. Absent for a field only its source returns. Each role's description names the kinds its values have.
 */
export const RecordRole = {
  /**
   * The platform's own id for the account (`account_id`).
   */
  AccountId: "account_id",
  /**
   * The state of the account, such as active or suspended (`label`).
   */
  AccountStatus: "account_status",
  /**
   * The sort of account, such as personal or business (`label`).
   */
  AccountType: "account_type",
  /**
   * A mobile, alternate or fax number beside the main one (`phone`).
   */
  AlternatePhone: "alternate_phone",
  /**
   * Money held on the account (`amount`).
   */
  Balance: "balance",
  /**
   * Whether the site banned the account (`flag`).
   */
  Banned: "banned",
  /**
   * What the person wrote about themselves (`long_text`).
   */
  Bio: "bio",
  /**
   * The date of birth (`date`).
   */
  Born: "born",
  /**
   * Whether the site marks the account as a bot (`flag`).
   */
  Bot: "bot",
  /**
   * The category callers give a phone number, such as telemarketer (`label`).
   */
  CallerCategory: "caller_category",
  /**
   * The banner picture of the profile (`image`).
   */
  CoverPicture: "cover_picture",
  /**
   * Whether the account is deleted or inactive (`flag`).
   */
  Deleted: "deleted",
  /**
   * When the account was deleted (`date` or `date_time`).
   */
  DeletedOn: "deleted_on",
  /**
   * A department the source names (`text`).
   */
  Department: "department",
  /**
   * The name the account shows (`person_name`).
   */
  DisplayName: "display_name",
  /**
   * Whether the site verified the email (`flag`).
   */
  EmailVerified: "email_verified",
  /**
   * When the account or its subscription expires (`date` or `date_time`).
   */
  Expires: "expires",
  /**
   * A first name (`person_name`).
   */
  FirstName: "first_name",
  /**
   * How many accounts follow the account (`count`).
   */
  Followers: "followers",
  /**
   * How many accounts the account follows (`count`).
   */
  Following: "following",
  /**
   * How many friends the account has (`count`).
   */
  Friends: "friends",
  /**
   * A whole postal address on one line (`address`).
   */
  FullAddress: "full_address",
  /**
   * A whole name (`person_name`).
   */
  FullName: "full_name",
  /**
   * The handle of the account (`username`).
   */
  Handle: "handle",
  /**
   * A headline or user title shown with the name (`text`).
   */
  Headline: "headline",
  /**
   * Interests the person lists (`text`).
   */
  Interests: "interests",
  /**
   * A job title the source states (`job_title`).
   */
  JobTitle: "job_title",
  /**
   * When the account was made (`date` or `date_time`).
   */
  Joined: "joined",
  /**
   * When the account was last active (`date` or `date_time`).
   */
  LastActive: "last_active",
  /**
   * The IP the account last used (`ip`).
   */
  LastIp: "last_ip",
  /**
   * A last name (`person_name`).
   */
  LastName: "last_name",
  /**
   * When the account last posted (`date` or `date_time`).
   */
  LastPost: "last_post",
  /**
   * When the account or its profile last changed (`date` or `date_time`).
   */
  LastUpdated: "last_updated",
  /**
   * A level or rank on the site (`label`).
   */
  Level: "level",
  /**
   * How many likes the account gave (`count`).
   */
  LikesGiven: "likes_given",
  /**
   * How many likes the account received (`count`).
   */
  LikesReceived: "likes_received",
  /**
   * The line type of a phone number, such as mobile or VoIP (`label`).
   */
  LineType: "line_type",
  /**
   * An account on another network. The field's name names the network (`username`, `account_id` or `url`).
   */
  LinkedAccount: "linked_account",
  /**
   * A place as the person wrote it (`text`).
   */
  Location: "location",
  /**
   * Whether callers mark a phone number as spam (`flag`).
   */
  MarkedSpam: "marked_spam",
  /**
   * A middle name (`person_name`).
   */
  MiddleName: "middle_name",
  /**
   * A nationality (`country`).
   */
  Nationality: "nationality",
  /**
   * An organisation the source names, such as a company (`organisation`).
   */
  Organisation: "organisation",
  /**
   * An IP whose use the source does not say (`ip`).
   */
  OtherIp: "other_ip",
  /**
   * Whether the account is paid or premium (`flag`).
   */
  Paid: "paid",
  /**
   * When the password last changed (`date` or `date_time`).
   */
  PasswordChanged: "password_changed",
  /**
   * The profile picture (`image`).
   */
  Picture: "picture",
  /**
   * Points on the site (`score`).
   */
  Points: "points",
  /**
   * How many posts the account made (`count`).
   */
  Posts: "posts",
  /**
   * Whether the account is private (`flag`).
   */
  Private: "private",
  /**
   * The link to the profile (`url`).
   */
  ProfileLink: "profile_link",
  /**
   * How many times people viewed the profile (`count`).
   */
  ProfileViews: "profile_views",
  /**
   * A rating of the account (`score`).
   */
  Rating: "rating",
  /**
   * How many people the account referred (`count`).
   */
  Referrals: "referrals",
  /**
   * Who or what referred the account (`text`).
   */
  Referrer: "referrer",
  /**
   * How many reports callers made on a phone number (`count`).
   */
  ReportCount: "report_count",
  /**
   * Reputation on the site (`score`).
   */
  Reputation: "reputation",
  /**
   * A reputation label for a phone number (`label`).
   */
  ReputationLabel: "reputation_label",
  /**
   * The country the person lives in (`country`).
   */
  Residence: "residence",
  /**
   * A salutation or suffix, such as Dr or Jr (`text`).
   */
  Salutation: "salutation",
  /**
   * A school the source names (`organisation`).
   */
  School: "school",
  /**
   * A signature the person posts under (`long_text`).
   */
  Signature: "signature",
  /**
   * The IP the account was made from (`ip`).
   */
  SignupIp: "signup_ip",
  /**
   * A role on the site, such as admin or moderator (`label`).
   */
  SiteRole: "site_role",
  /**
   * How likely a phone number is spam, as the source scores it (`score`).
   */
  SpamScore: "spam_score",
  /**
   * A street line of an address (`address`).
   */
  Street: "street",
  /**
   * Whether the site verified the account (`flag`).
   */
  Verified: "verified",
  /**
   * Warnings and infractions on the account (`count`).
   */
  Warnings: "warnings",
  /**
   * A website the person lists (`url`).
   */
  Website: "website",
} as const;
/**
 * Which common field a value is, where many sources share it: a join date and a birth date are both dates, with the roles joined and born. A platform account's field and a breach row's column with the same meaning carry the same kind and role. A linked_account field is named by its network. Absent for a field only its source returns. Each role's description names the kinds its values have.
 */
export type RecordRole = OpenEnum<typeof RecordRole>;

/** @internal */
export const RecordRole$inboundSchema: z.ZodMiniType<RecordRole, unknown> =
  openEnums.inboundSchema(RecordRole);
