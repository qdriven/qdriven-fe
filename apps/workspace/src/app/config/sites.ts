import { Metadata } from "next";

const title = "workspace";
const description = "integrate with different tools";

export const websiteMetaData: Metadata = {
//   metadataBase: new URL("https://keystatic-examples-knowledge-base.vercel.app"),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
    siteName: title,
    locale: "zh",
    type: "website",
  },
};