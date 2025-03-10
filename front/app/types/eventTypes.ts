export interface EventType {
  eventName: string;
  host: string;
  durationStart: string;
  durationEnd: string;
  participants: string[];
  schedules: { user: string; start: string; end: string; key?: string }[];
}
