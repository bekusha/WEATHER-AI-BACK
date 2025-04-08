import { Controller, Post, Body } from '@nestjs/common';
import {AiService} from './ai.service';
import { ForecastDto } from './dto/forecast.dto';


@Controller('ai')
export class AiController {
    constructor(private aiService:AiService){}

    @Post('ai-advice')
    getAdvice(@Body('forecast') forecastDto:ForecastDto){
        return this.aiService.getTravelAdvice(forecastDto)
    }
}
