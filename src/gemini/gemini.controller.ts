import { Controller, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  getHello(): string {
    const apiKey = process.env.GEMINI_API_KEY;

    return `Hello from GeminiController!\n Your API Key is: ${apiKey}`;
  }
}
