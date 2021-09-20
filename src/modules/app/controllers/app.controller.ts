import {Controller, Get, Query, Render} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {ItemInt} from "../../../share/interfaces/Item";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.hbs')
  root() {
    const items = this.appService.sortData()

    return { items };
  }

  @Get('/data')
  getData(@Query('filter') filter: boolean): Array<ItemInt> {
    const items = this.appService.sortData(filter);

    return items;
  }
}
