// The response must include the group ID and the list of Player IDs of the group members.
export interface CreateEventUserResponseDto {
    groupId: string,
    playerIds: string[]
}