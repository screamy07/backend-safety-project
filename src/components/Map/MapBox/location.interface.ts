export interface ILocation {
	id: number;
	name: string;
	description: string;
	longitude: number;
	latitude: number;
	waterLevel: string;
	temperatureLevel: string;
	snowLevel: string;
	rainLevel: string;
	dangerResult: string;
	createdAt: string;
	showed?: boolean;
}