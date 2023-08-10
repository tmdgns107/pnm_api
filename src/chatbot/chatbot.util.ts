import { Configuration, OpenAIApi } from "openai";

type Answer = {
  role: string,
  content: string
}
/** GPT API **/
export async function callGptAPI(messages: any[]): Promise<any>{
  try{
    const configuration = new Configuration({
      apiKey: process.env.GPT_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.9,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });

    console.log(`callGptAPI response.data ${JSON.stringify(response.data, null, 2)}`);
    if(!response.data){
      console.log("GPT API response error");
      throw new Error("GPT API response error");
    }

    const answer: Answer = {
      role: 'system',
      content: response.data.choices[0].message.content
    };
    messages.push(answer);

    return messages;
  }catch (e) {
    console.log("Error in callGptAPI", JSON.stringify(e, null, 2));
    throw e;
  }
}

