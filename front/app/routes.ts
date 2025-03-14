import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/main-page.tsx"),
  route("create", "routes/create-page.tsx"),
  // route("host", "routes/host.tsx"),
  route("information", "routes/info-page.tsx"),
  route("login", "routes/login-page.tsx"),
  route("event/:eventCode", "routes/event-page.tsx"),
] satisfies RouteConfig;
