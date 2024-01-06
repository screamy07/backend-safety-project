export interface IUser {
	id: number;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	longitude: number;
	latitude: number;
	createdAt: string;
	roles: IUserRole[]
}

export interface IUserRole {
	id: number;
	name: string;
	userId: number;
	createdAt: string;
}