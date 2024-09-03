import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "544nqitn",
    dataset: "tik-tok-sanity",
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
})