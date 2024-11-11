import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import OpenAi from "openai";

const openAi = new OpenAi();

// instantiate openAi embedding model
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small'
});

// instantiate Chroma vector store
const store = new Chroma(embeddings, {
  collectionName: 'cv-documents',
});

export const loadFileAsDocumentAndStore = async (filePath: string) => {
  const pdfLoader = new PDFLoader(filePath);
  const document = await pdfLoader.load();
  await store.addDocuments(document);
};

export const queryVectorStore  = async (userPrompt: string) => {
  const results = await store.similaritySearch(userPrompt, 1);

  const response = await openAi.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content:
          'You are a helpful AI HR assistant. Answer questions to your best ability.',
      },
      {
        role: 'user',
        content: `
          Answer the following question using the information provided.
          Provide as many details as possible.expect a "skills" section on provided context.
          example response: "Bob works with JavaScript and have 5 years of experience."
          If you cannot answer the question with the context, don't lie and make up stuff. 
          Just say you need more context.
          question: ${userPrompt}
          context: ${results.map((result) => result.pageContent).join('\n')}
        `,
      },
    ],
  });

  return {
    answer: response.choices[0].message.content,
    sources: results.map((result) => result.metadata['source']),
  }
};










