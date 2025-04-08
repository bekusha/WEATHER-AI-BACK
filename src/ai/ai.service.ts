import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ForecastDto } from './dto/forecast.dto';
@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);

    constructor(
        private configService: ConfigService,
        private httpService: HttpService
    ) {}

    async getTravelAdvice(data: ForecastDto): Promise<string>{
        // OPENAI API URL % API KEY
        const url = 'https://api.openai.com/v1/chat/completions';
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');
        // formated data for ai
        const forecastSummary = this.formatForecast(data);
        const messages = [
            {
                role: 'system',
                 content: 'You are a helpful assistant that gives travel advice based on 5-day weather forecasts. Format your response in clean Markdown.'
            },
            {
                role: 'user',
                content: `Location: ${data.city.name}\n\nForecast:\n${forecastSummary}\n\nPlease suggest what to pack, how to prepare, and share 2-3 interesting facts about ${data.city.name}. Respond using Markdown format with proper headings, bullet points.`,
              },
        ];
        try {
            const response = await lastValueFrom(
              this.httpService.post(
                url,
                {
                  model: 'gpt-4-turbo',
                  messages,
                  temperature: 0.8,
                },
                {
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                }
              )
            );
      
            const content = response.data.choices[0].message.content;
            this.logger.debug('AI response received');
            return content;
          } catch (error) {
            this.logger.error('Failed to get AI travel advice', error);
            throw new InternalServerErrorException('AI service unavailable');
        }
    }

    private formatForecast(data: ForecastDto): string {
        return data.list
          .map(item => {
            const date = item.dt_txt.split(' ')[0];
            const time = item.dt_txt.split(' ')[1];
            const temp = item.main.temp.toFixed(1);
            const desc = item.weather[0].description;
            return `- **${date} ${time}**: ${desc}, ${temp}°C`;
          })
          .join('\n');
      }
}
