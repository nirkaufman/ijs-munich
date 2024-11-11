import {search} from "~/lib/search";

export default eventHandler( async (event) => {
  const body = await readBody(event);

  return await search(body.prompt);
});
