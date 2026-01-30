"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    await app.listen(4000);
    console.log(`🚀 Backend running on http://localhost:4000/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map