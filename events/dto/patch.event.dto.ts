import { PutEventDto } from './put.event.dto';
/**
 * HTTP PATCH method was added 
 * to the HTTP protocol in 2010 to overcome the 
 * limitations of HTTP PUT requests, which provide 
 * no support for partial updates.
*/
export interface PatchEventDto extends Partial<PutEventDto> {}