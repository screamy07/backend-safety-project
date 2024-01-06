import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './repositories/vehicle.repository';

@Injectable()
export class VehicleService {

	constructor(private vehicleRepository: VehicleRepository) { }

	async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
		return this.vehicleRepository.createOne(createVehicleDto);
	}

	async findAll(): Promise<Vehicle[]> {
		return this.vehicleRepository.getAll();
	}

	findOne(id: number) {
		return `This action returns a #${id} vehicle`;
	}

	update(id: number, updateVehicleDto: UpdateVehicleDto) {
		return `This action updates a #${id} vehicle`;
	}

	remove(id: number) {
		return `This action removes a #${id} vehicle`;
	}
}
