export type SignUpUserType = {
  username?: string;
  password: string;
  email: string;
  eventCode: string;
};

export type CurrentUserType = {
  username?: string;
  email?: string;
  eventCode?: string;
};
