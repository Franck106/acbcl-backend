import { IGuestResponse } from "./guestResponse";

export interface IAbsenceResponse {
    id: string;
    eventId: string;
    reason: string;
    userId?: string;
    kidId?: string;
    guest?: IGuestResponse;
}