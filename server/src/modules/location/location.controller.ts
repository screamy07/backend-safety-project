import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { UserRole } from '../user/enums';
import { CreateLocationDto } from './dtos/create-location.dto';
import { LocationService } from './location.service';
import { Location } from './models';

@Controller('locations')
export class LocationController {
	constructor(private readonly locationService: LocationService) { }

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(UserRole.ADMIN)
	@Post()
	async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
		return this.locationService.createLocation(createLocationDto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(UserRole.USER)
	@Get()
	async getAllLocations(@Query('name') name?: string): Promise<Location[]> {
		return name ? this.locationService.getSortedLocationsByName(name) : this.locationService.getAllLocations();
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(UserRole.USER)
	@Get(':id')
	async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Location> {
		return this.locationService.getLocationById(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(UserRole.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	async remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
		await this.locationService.removeLocation(id);
	}
}
