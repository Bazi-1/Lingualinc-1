"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./Controller/auth.controller");
const auth_service_1 = require("./Services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("./Entities/users.entity");
const local_strategy_1 = require("./Validators/local.strategy");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const feedback_module_1 = require("./modules/feedback.module");
const jwt_strategy_1 = require("./Validators/jwt.strategy");
const session_module_1 = require("./modules/session.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../../frontend/src/Components/Images'),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'Zi@d2@@1',
                database: 'lingualinc',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            jwt_1.JwtModule.register({
                secret: 'cSHUl|rArf1SgvR-#zNN*6#DGs/l|/%/_2?4&({Edd:BZ9DQ[l]pDkJmvb$u%}3',
                signOptions: { expiresIn: '60m' },
            }),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User]),
            feedback_module_1.FeedbackModule,
            session_module_1.SessionModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map