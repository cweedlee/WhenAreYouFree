import { Link } from "react-router";
import { NavigationMenuTrigger } from "./ui/navigation-menu";

const Navigation = () => (
  <nav>
    <Link to="/">
      <h1>WhenRUfree</h1>
    </Link>
    <NavigationMenuTrigger>
      <button>Menu</button>
    </NavigationMenuTrigger>
    <Link to="/create"></Link>
  </nav>
);

export default Navigation;
