export interface CreateUserDto {
    // id: string;

    // primary user-facing ID for the user
    email: string;
    password: string;
    level: number;
}