import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Location } from './models';
import { LocationRepository } from './repositories';

@Module({
	imports: [SequelizeModule.forFeature([Location])],
	controllers: [LocationController],
	providers: [LocationService, LocationRepository]
})
export class LocationModule { }
