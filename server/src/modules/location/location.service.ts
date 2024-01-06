import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dtos/create-location.dto';
import { DangerResult, RainLevel, SnowLevel, TemperatureLevel, WaterLevel } from './enums';
import { Location } from './models';
import { LocationRepository } from './repositories';

@Injectable()
export class LocationService {
	constructor(private readonly locationRepository: LocationRepository) { }

	async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
		const dangerResult = this.calculateDangerResult(createLocationDto);
		return this.locationRepository.createOne({ ...createLocationDto, dangerResult });
	}

	async getAllLocations(): Promise<Location[]> {
		return this.locationRepository.getAll();
	}

	async getLocationById(id: number): Promise<Location> {
		return this.locationRepository.getOneById(id);
	}

	async getSortedLocationsByName(name: string): Promise<Location[]> {
		return this.locationRepository.getSortedByName(name);
	}

	async removeLocation(id: number): Promise<void> {
		await this.locationRepository.removeOne(id);
	}

	async removeLocationByName(name: string): Promise<void> {
		await this.locationRepository.removeAllByName(name);
	}

	calculateDangerResult(dto: CreateLocationDto): DangerResult {
		const { waterLevel, snowLevel, temperatureLevel, rainLevel } = dto;

		if (waterLevel === WaterLevel.HIGH && rainLevel === RainLevel.HIGH) {
			return DangerResult.EVACUATE;
		}

		if (waterLevel === WaterLevel.HIGH && temperatureLevel === TemperatureLevel.HIGH && snowLevel === SnowLevel.HIGH) {
			return DangerResult.EVACUATE;
		}

		if (waterLevel === WaterLevel.HIGH && temperatureLevel === TemperatureLevel.AVERAGE
			&& snowLevel === SnowLevel.HIGH && rainLevel === RainLevel.AVERAGE) {
			return DangerResult.INCREASE_ATTENTION;
		}

		if (waterLevel === WaterLevel.AVERAGE && temperatureLevel === TemperatureLevel.HIGH
			&& snowLevel === SnowLevel.HIGH && rainLevel === RainLevel.HIGH) {
			return DangerResult.INCREASE_ATTENTION;
		}

		return DangerResult.DONT_WORRY;
	}
}
