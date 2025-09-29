import { Body, Controller, Get, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  getHello(): string {
    const apiKey = process.env.GEMINI_API_KEY;

    return `Hello from GeminiController!\n Your API Key is: ${apiKey}`;
  }

  @Post('basic-prompt')
  basicPrompt(@Body() basicPromptDto: BasicPromptDto) {
    return this.geminiService.basicPrompt(basicPromptDto);
  }
}
