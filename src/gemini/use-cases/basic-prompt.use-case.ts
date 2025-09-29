import { GoogleGenAI } from '@google/genai';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';

interface Options {
  model?: string;
  systemInstruction?: string;
}

export const basicPromptUseCase = async (
  ai: GoogleGenAI,
  basicPromptDto: BasicPromptDto,
  options?: Options,
) => {
  const {
    model = 'gemini-2.5-flash',
    systemInstruction = `
      Responde unicamente en español y en formato markdown
      Usa el sistema métrico decimal
      No incluyas emojis en las respuestas
    `,
  } = options ?? {};

  const response = await ai.models.generateContent({
    model: model,
    contents: basicPromptDto.prompt,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return response.text;
};
