require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;
const databaseId_2 = process.env.NOTION_API_DATABASE_2;

module.exports = {
  // test code
  // getDatabase: async () => {
  //   const response = await notion.databases.query({ database_id: databaseId });
  //   return response.results.map((page) => {
  //     return {
  //       name: page.properties.Name.title[0]?.plain_text,
  //       phone: page.properties.PhoneNumber.rich_text[0]?.plain_text,
  //       url: page.properties.ExtraInfo.rich_text[0]?.plain_text,
  //     };
  //   });
  // },
  getDatabase_1: async () => {
    const response = await notion.databases.query({ database_id: databaseId });
    return response.results.map((page) => {
      return {
        nickname: page.properties.Nickname.title[0]?.plain_text,
        answer: page.properties.Content.rich_text[0]?.plain_text,
      };
    });
  },
  getDatabase_2: async () => {
    const response = await notion.databases.query({
      database_id: databaseId_2,
    });
    return response.results.map((page) => {
      return {
        nickname: page.properties.Nickname.title[0]?.plain_text,
        answer: page.properties.Content.rich_text[0]?.plain_text,
      };
    });
  },
};
