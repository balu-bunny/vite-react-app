import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates an `Org` database table with organization details
including name, type, email, icon, color, storage, and encryptionKey.
The authorization rule below specifies that any user authenticated via an
API key can "create", "read", "update", and "delete" any `Org` records.
=========================================================================*/
const schema = a.schema({
  Credentials: a.customType({
    clientId: a.string(),
    clientSecret: a.string(),
  }),
  org: a
    .model({
      name: a.string(),
      type: a.string(),
      email: a.string(),
      icon: a.string(),
      color: a.string(),
      storage: a.string(),
      encryptionKey: a.string(),
      // credentials stored as JSON string: { clientId, clientSecret }
      credentials: a.ref("Credentials")
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: Orgs } = await client.models.Org.list()

// return <ul>{Orgs.map(Org => <li key={Org.id}>{Org.content}</li>)}</ul>
