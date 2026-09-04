import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function getPlainText(richTextArray) {
  return (richTextArray || []).map((t) => t.plain_text).join("");
}

// helper: ambil data_source_id pertama dari sebuah database
async function getDataSourceId(databaseId) {
  const db = await notion.databases.retrieve({ database_id: databaseId });
  return db.data_sources[0].id;
}

export async function getProjectsFromNotion() {
  const dataSourceId = await getDataSourceId(process.env.NOTION_PROJECTS_DB_ID);
  const response = await notion.dataSources.query({ data_source_id: dataSourceId });

  return response.results.map((page) => {
    const props = page.properties;
    const images = (props.Images?.files || []).map((f) => f.file?.url || f.external?.url).filter(Boolean);

    return {
      slug: getPlainText(props.Slug?.rich_text) || page.id,
      name: getPlainText(props.Name?.rich_text),
      status: props.Status?.select?.name === "Selesai" ? "done" : "wip",
      description: getPlainText(props.Description?.rich_text),
      tags: (props.Tags?.multi_select || []).map((t) => t.name),
      images,
    };
  });
}

export async function getSkillsFromNotion() {
  const dataSourceId = await getDataSourceId(process.env.NOTION_SKILLS_DB_ID);
  const response = await notion.dataSources.query({ data_source_id: dataSourceId });

  return response.results.map((page) => getPlainText(page.properties.Name?.rich_text)).filter(Boolean);
}

export async function getExperiencesFromNotion() {
  const dataSourceId = await getDataSourceId(process.env.NOTION_EXPERIENCE_DB_ID);
  const response = await notion.dataSources.query({ data_source_id: dataSourceId });

  return response.results.map((page) => {
    const props = page.properties;

    return {
      position: getPlainText(props.Position?.rich_text),
      start_date: props.StartDate?.date?.start,
      end_date: props.EndDate?.date?.start || null,
      company: getPlainText(props.Company?.rich_text),
    };
  });
}
