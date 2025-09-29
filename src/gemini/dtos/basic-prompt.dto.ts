import { IsNotEmpty, IsString } from 'class-validator';

export class BasicPromptDto {
  @IsString()
  @IsNotEmpty()
  readonly prompt: string;
}
