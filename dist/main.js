"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const Handlebars = require("hbs");
const app_module_1 = require("./modules/app/app.module");
Handlebars.registerHelper('json', function (data) {
    return JSON.stringify(data);
});
Handlebars.registerHelper('list', function (data, options) {
    let str = '<div class="table__body" style="display: none;">';
    data.map(item => {
        str += `<div class="table__row">
      <div class="table__cell">
          ${item.id}
      </div>
      <div class="table__cell">
          ${item.balance}
      </div>
      <div class="table__cell">
          ${item.name}
      </div>
      <div class="table__cell">
          ${item.email}
      </div>
    </div>`;
        if (item.items) {
            str += Handlebars.handlebars.helpers.list(item.items, options);
        }
    });
    str += '</div>';
    return str;
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map