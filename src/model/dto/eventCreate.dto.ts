import { IEvent } from "@model/types/event";
import { ActivityResponseDTO } from "./activityResponse.dto";

export class EventCreateDTO implements IEvent {
  start: Date;
  end: Date;
  summary?: string;
  location?: string;
  description?: string;
  colorId?: number;
  attendees?: { email: string }[];
  activity: ActivityResponseDTO;
}
