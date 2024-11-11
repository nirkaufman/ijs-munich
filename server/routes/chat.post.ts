import {getChatResponse} from "~/lib/chat";

export default eventHandler( async (event) => {
  const body = await readBody(event);

  return await getChatResponse(body.prompt);
});
