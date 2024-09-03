import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
})