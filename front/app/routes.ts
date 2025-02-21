import { type RouteConfig, index, route } from "@react-router/dev/routes";
import main from "./routes/main";

export default [
  index("routes/main.tsx"),
  // route("host", "routes/host.tsx"),
  // route("guest", "routes/guest.tsx"),
] satisfies RouteConfig;
