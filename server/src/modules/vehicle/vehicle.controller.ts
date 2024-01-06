import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService) { }

	@Post()
	async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
		console.log(createVehicleDto)
		return this.vehicleService.create(createVehicleDto);
	}

	@Get()
	async findAll(): Promise<Vehicle[]> {
		return this.vehicleService.findAll();
	}

}
