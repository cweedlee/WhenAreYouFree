export interface EventType {
  eventName: string;
  host: string;
  durationStart: string;
  durationEnd: string;
  participants: ParticipantType[];
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

export enum AUTHTYPE {
  GUEST = "guest",
  HOST = "host",
  ADMIN = "admin",
}

export interface ParticipantType {
  username?: string;
  authority: AUTHTYPE;
  email: string;
}

export enum Mode {
  VIEW,
  CREATE,
  EDIT,
}
