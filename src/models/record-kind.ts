import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What sort of value a field holds, which decides how it is cleaned, compared and searched again. It comes from the source where the source declares it, as a connector does for the fields it states, else from the value itself where its shape is certain (an email, an IP, a URL, an international phone number), else from the answer committed for the source's column, else from the answer stored for it, else text. A value of any kind is returned. Each kind's description says what it holds and the form value takes.
 */
export const RecordKind = {
  /**
   * An email address. value: in lower case, without a mailto: prefix.
   */
  Email: "email",
  /**
   * A phone number. value: in E.164 form, such as +447700900123. A national number is cleaned only when the country of the source's site is known.
   */
  Phone: "phone",
  /**
   * A handle a person chose. value: as written. Compare it in lower case. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  Username: "username",
  /**
   * A platform's own id for an account. value: as written. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  AccountId: "account_id",
  /**
   * A web address. value: the scheme and host in lower case, the path, query and fragment as written.
   */
  Url: "url",
  /**
   * A host name with no path. value: in lower case, also when the source wrote a URL.
   */
  Domain: "domain",
  /**
   * A picture, as a link or a file. value: the link, cleaned as a `url`, else the file as written. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  Image: "image",
  /**
   * A whole name or a part of one. value: with each run of spaces made one space.
   */
  PersonName: "person_name",
  /**
   * A stated gender. value: `female`, `male` or `other` when the value names one of them, else as written.
   */
  Gender: "gender",
  /**
   * An age in years. value: a whole number from 0 to 150.
   */
  Age: "age",
  /**
   * A language. value: its ISO 639 code, two letters when the language has them.
   */
  Language: "language",
  /**
   * A company, school or group by name. value: with each run of spaces made one space.
   */
  Organisation: "organisation",
  /**
   * A position or occupation. value: as written.
   */
  JobTitle: "job_title",
  /**
   * A country. value: its ISO 3166-1 alpha-2 code, such as GB.
   */
  Country: "country",
  /**
   * A state, province or county. value: as written.
   */
  Region: "region",
  /**
   * A city or town. value: as written.
   */
  City: "city",
  /**
   * A street address or one line of it. value: as written. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  Address: "address",
  /**
   * A postal code. value: in upper case with single spaces.
   */
  Postcode: "postcode",
  /**
   * A latitude and longitude. value: `latitude,longitude` in decimal degrees.
   */
  Coordinates: "coordinates",
  /**
   * A timezone or an offset. value: an IANA zone name, UTC, or an offset such as +05:30.
   */
  Timezone: "timezone",
  /**
   * A calendar date. value: in ISO form at the precision the source gives: 2014, 2014-03 or 2014-03-07.
   */
  Date: "date",
  /**
   * A moment. value: in ISO form in UTC, such as 2014-03-07T09:30:00Z, or a date when the source gives no time.
   */
  DateTime: "date_time",
  /**
   * A length of time. value: a number of seconds.
   */
  Duration: "duration",
  /**
   * An IPv4 or IPv6 address. value: its standard text form. An IPv4 address stored as a whole number is written as IPv4.
   */
  Ip: "ip",
  /**
   * A network card address. value: in lower case with colons.
   */
  MacAddress: "mac_address",
  /**
   * An id of a phone, computer or browser. value: as written. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  DeviceId: "device_id",
  /**
   * A browser or app signature. value: as written.
   */
  UserAgent: "user_agent",
  /**
   * A password in plain text. value: exactly as written, spaces included.
   */
  Password: "password",
  /**
   * A password hash. value: as written. detail names the likely algorithm, such as bcrypt.
   */
  Hash: "hash",
  /**
   * The salt for a hash. value: exactly as written.
   */
  Salt: "salt",
  /**
   * A session, reset or API token. value: as written. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  Token: "token",
  /**
   * A security question or its answer. value: exactly as written.
   */
  SecurityAnswer: "security_answer",
  /**
   * A payment card number. value: its 12 to 19 digits only.
   */
  CardNumber: "card_number",
  /**
   * An IBAN or account number. value: its letters and digits only, in upper case.
   */
  BankAccount: "bank_account",
  /**
   * A wallet address. value: as written. detail names the likely coin, such as BTC.
   */
  CryptoAddress: "crypto_address",
  /**
   * Money, with its currency when given. value: a plain decimal. detail names the currency, such as USD.
   */
  Amount: "amount",
  /**
   * A passport, tax, national or licence number. value: as written. A value that is only zeros, or null, nil, none, undefined or n/a, has no value.
   */
  IdNumber: "id_number",
  /**
   * A number plate or a VIN. value: in upper case with no spaces.
   */
  Vehicle: "vehicle",
  /**
   * One of a small set, such as a status or level. value: as written.
   */
  Label: "label",
  /**
   * Free writing, such as a bio or signature. value: as written.
   */
  LongText: "long_text",
  /**
   * A whole number of things. value: a whole number of 0 or more, with no thousands separators.
   */
  Count: "count",
  /**
   * A rating, rank or points. value: a plain decimal.
   */
  Score: "score",
  /**
   * A yes or no. value: `true` or `false`.
   */
  Flag: "flag",
  /**
   * A nested value that could not be split. value: as written.
   */
  Structured: "structured",
  /**
   * Anything else. value: as written.
   */
  Text: "text",
} as const;
/**
 * What sort of value a field holds, which decides how it is cleaned, compared and searched again. It comes from the source where the source declares it, as a connector does for the fields it states, else from the value itself where its shape is certain (an email, an IP, a URL, an international phone number), else from the answer committed for the source's column, else from the answer stored for it, else text. A value of any kind is returned. Each kind's description says what it holds and the form value takes.
 */
export type RecordKind = OpenEnum<typeof RecordKind>;

/** @internal */
export const RecordKind$inboundSchema: z.ZodMiniType<RecordKind, unknown> =
  openEnums.inboundSchema(RecordKind);
