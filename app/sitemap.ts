import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services", "/book", "/studio"].map((path) => ({ url: `${siteUrl}${path}` }));
}
