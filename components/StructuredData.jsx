import { getPersonSchema, getWebsiteSchema } from "@/lib/structuredData";

export default function StructuredData() {
  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  );
}
