export interface IAbsenceCreate {
    eventId: string;
    reason: string;
    userId?: string;
    kidId?: string;
    guestId?: string;
}