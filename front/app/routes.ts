import { type RouteConfig, index, route } from "@react-router/dev/routes";
import main from "./routes/main-page";

export default [
  index("routes/main-page.tsx"),
  route("create", "routes/create-page.tsx"),
  // route("host", "routes/host.tsx"),
  // route("guest", "routes/guest.tsx"),
  route("login", "routes/login-page.tsx"),
] satisfies RouteConfig;
