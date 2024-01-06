import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { LocationModule } from './modules/location/location.module';
import { UserModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				host: configService.get<string>('POSTGRES_HOST'),
				port: configService.get<number>('POSTGRES_PORT'),
				username: configService.get<string>('POSTGRES_USERNAME'),
				password: configService.get<string>('POSTGRES_PASSWORD'),
				database: configService.get<string>('POSTGRES_DATABASE'),
				dialect: configService.get<Dialect>('POSTGRES_DIALECT'),
				autoLoadModels: true,
				sync: { alter: true },
				logging: console.log
			})
		}),
		UserModule,
		AuthModule,
		LocationModule,
		VehicleModule
	],
	providers: [AppService],
})
export class AppModule { }
