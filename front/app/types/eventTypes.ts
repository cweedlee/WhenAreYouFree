export interface EventType {
  eventName: string;
  host: string;
  durationStart: string;
  durationEnd: string;
  participants: string[];
  schedules: {
    username: string;
    start: string;
    end: string;
    id: string;
  }[];
  availableTime?: {
    start: Number;
    end: Number;
  };
  eventCode: string;
}
[];

export enum Mode {
  VIEW,
  CREATE,
  EDIT,
}
