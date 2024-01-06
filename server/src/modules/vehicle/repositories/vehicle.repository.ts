import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { Vehicle } from "../entities/vehicle.entity";

@Injectable()
export class VehicleRepository {
	constructor(@InjectModel(Vehicle) private vehicleModel: typeof Vehicle) { }

	async getAll() {
		return this.vehicleModel.findAll();
	}

	async createOne(createVehicleDto: CreateVehicleDto) {
		return this.vehicleModel.create(createVehicleDto as any);
	}
}