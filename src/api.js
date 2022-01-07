const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const getHomePageContent = async () => {
  const response = await client.getEntry(
    process.env.REACT_APP_HOMEPAGE_CONTENT_ID
  );
  return response.fields;
};
