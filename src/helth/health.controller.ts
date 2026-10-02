import { Controller, Get, Version} from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';


@ApiTags('Health')
@Controller('health')
export class HealthController {


  @Version('1')
  @Get()
  check(){

    return {status: 'ok',service: 'movie-app-api',timestamp: new Date().toISOString()}
  }
}