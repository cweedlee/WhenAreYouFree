export interface EventType {
  eventName: string;
  host: string;
  durationStart: string;
  durationEnd: string;
  participants: { [key: string]: { start: string; end: string }[] };
}
