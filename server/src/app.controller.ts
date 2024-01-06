import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('vehicles')
	getHello(): string {
		return this.appService.getHello();
	}

	@Post('vehicles')
	async createVehicle(@Body() createVehicleDto: { name: string, capacity: number, amount: number }) {

	}
}
