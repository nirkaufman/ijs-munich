import OpenAi from 'openai';

const openAi = new OpenAi();

interface ChatMessage {
  role: string;
  content: string;
}

async function newMessage(history: ChatMessage[], message: any) {
  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
          You are an HR assistant. 
          You are helping a tech human resource professional to 
          hire candidates.
          Don't share any personal information.
          If you are unsure about a question, dont answer it.
          If the user asks for answer which is not related to the job,
          you can respond with "I am not sure about that".
        `,
      },
      ...history, // we pass the history from context
      message
    ],
  });

  return response.choices[0].message ;
}

let chatHistory: ChatMessage[] = [];

export async function getChatResponse(prompt: string): Promise<ChatMessage[]> {
  const formattedMessage = { role: "user", content: prompt }
  const chatResponse = await newMessage(chatHistory, formattedMessage)

  if(prompt === "reset") {
    chatHistory = [];
    return chatHistory;
  }

  chatHistory.push(formattedMessage, chatResponse)

  return chatHistory;
}
