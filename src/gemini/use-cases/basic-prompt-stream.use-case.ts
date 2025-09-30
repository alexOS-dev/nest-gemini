/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';

interface Options {
  model?: string;
  systemInstruction?: string;
}

export const basicPromptStreamUseCase = async (
  ai: GoogleGenAI,
  basicPromptDto: BasicPromptDto,
  options?: Options,
) => {
  const { prompt, files = [] } = basicPromptDto;

  const uploads = await Promise.all(
    files.map(async (file: Express.Multer.File) => {
      const mime = file.mimetype?.startsWith('image/')
        ? file.mimetype
        : 'image/jpeg';

      const blob = new Blob([new Uint8Array(file.buffer)], { type: mime });

      const uploaded = await ai.files.upload({
        file: blob,
        config: {
          mimeType: mime,
          displayName: file.originalname || 'image.jpg',
        },
      });
      return uploaded;
    }),
  );

  const {
    model = 'gemini-2.5-flash',
    systemInstruction = `
      Responde unicamente en español y en formato markdown
      Usa el sistema métrico decimal
      No incluyas emojis en las respuestas
    `,
  } = options ?? {};

  const response = await ai.models.generateContentStream({
    model: model,
    contents: [
      createUserContent([
        prompt,
        ...uploads.map((upload) =>
          createPartFromUri(upload.uri!, upload.mimeType!),
        ),
      ]),
    ],
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return response;
};
