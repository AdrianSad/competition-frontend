export const USER_LOGIN = "/api/v1/user/login";
export const USER_REGISTER = "/api/v1/user/register";
export const COMPETITION = "/api/v1/competition";
export const LEAVE_COMPETITION = (id) => `/api/v1/competition/leave/${id}`;
export const COMPETITION_DETAILS = (id) => `/api/v1/competition/${id}`;
export const COMPETITION_RESULT = (id) =>
  `/api/v1/competition/add-result/${id}`;
