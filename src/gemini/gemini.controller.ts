import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { type Response } from 'express';

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
  @Post('basic-prompt-stream')
  async basicPromptStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: Response,
    // TODO: Files
  ) {
    const stream = await this.geminiService.basicPromptStream(basicPromptDto);

    res.setHeader('Content-Type', 'text/plain');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.text;
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }
}
