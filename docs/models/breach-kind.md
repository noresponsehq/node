# BreachKind

Who is in the table: site_breach, a site's own users; credential_list, a combolist or compilation; stealer_log, malware or botnet victims; scrape; hacking_forum, a criminal hacking, cracking or carding community; abuse_service, the customers of DDoS-for-hire, account generators, dump or card shops, darknet markets, stalkerware or breach-lookup services; darkweb_site, an onion site of unknown purpose.

## Example Usage

```typescript
import { BreachKind } from "@noresponse/node/models";

let value: BreachKind = "credential_list";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"site_breach" | "credential_list" | "stealer_log" | "scrape" | "hacking_forum" | "abuse_service" | "darkweb_site" | Unrecognized<string>
```