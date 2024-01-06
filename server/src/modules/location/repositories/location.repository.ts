import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLocationDto } from "../dtos/create-location.dto";
import { DangerResult } from "../enums";
import { Location } from '../models';

@Injectable()
export class LocationRepository {
	constructor(@InjectModel(Location) private readonly locationModel: typeof Location) { }

	async getAll(): Promise<Location[]> {
		return this.locationModel.findAll();
	}

	async getOneById(id: number): Promise<Location> {
		return this.locationModel.findByPk(id);
	}

	async getSortedByName(name: string): Promise<Location[]> {
		return this.locationModel.findAll({ where: { name }, order: [['createdAt', 'DESC']] });
	}

	async createOne(createLocationDto: CreateLocationDto & { dangerResult: DangerResult }): Promise<Location> {
		return this.locationModel.create(createLocationDto as any);
	}

	async removeOne(id: number): Promise<void> {
		await this.locationModel.destroy({ where: { id } });
	}

	async removeAllByName(name: string): Promise<void> {
		await this.locationModel.destroy({ where: { name } });
	}
}