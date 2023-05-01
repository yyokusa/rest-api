/**
 * PATCH only updates the fields that we pass, 
 * while the HTTP PUT method updates the entire 
 * resource at once.
 */
export interface PutUserDto {
    // id: string;
    email: string;
    password: string;
    permissionFlags: number;
}
