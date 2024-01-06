import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './repositories/vehicle.repository';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
	imports: [SequelizeModule.forFeature([Vehicle])],
	controllers: [VehicleController],
	providers: [VehicleService, VehicleRepository]
})
export class VehicleModule { }
