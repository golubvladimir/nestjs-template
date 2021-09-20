import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as Handlebars from 'hbs';

import { AppModule } from './modules/app/app.module';


Handlebars.registerHelper('json', function (data) {
  return JSON.stringify(data);
})

Handlebars.registerHelper('list', function (data, options) {
  let str = '<div class="table__body" style="display: none;">'

  data.map(item => {
    str += `<div class="table__row">
      <div class="table__cell">
          ${ item.id }
      </div>
      <div class="table__cell">
          ${ item.balance }
      </div>
      <div class="table__cell">
          ${ item.name }
      </div>
      <div class="table__cell">
          ${ item.email }
      </div>
    </div>`

    if (item.items) {
      str += Handlebars.handlebars.helpers.list(item.items, options);
    }
  })

  str += '</div>'

  return str;
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
