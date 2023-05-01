/**
 * PATCH only updates the fields that we pass, 
 * while the HTTP PUT method updates the entire 
 * resource at once.
 */
export interface PutEventDto {
    time: string;
}
