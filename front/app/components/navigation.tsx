import type { MouseEventHandler } from "react";
import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "~/ui/navigation-menu";

const itemStyle = "list-none align-center my-auto";

const Item = ({
  title,
  to,
  onClick,
  className = "",
}: {
  title: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  return (
    <div className={itemStyle}>
      {to ? (
        <Link to={to}>{title}</Link>
      ) : onClick ? (
        <button onClick={onClick}>{title}</button>
      ) : (
        <button>{title}</button>
      )}
    </div>
  );
};

const Navigation = () => (
  <nav className="flex w-full max-w-full backdrop-blur h-10 top-0 left-0 bg-red-400/20 gap-4 px-5 z-50 justify-between">
    <Link to="/" className="font-black align-center justify-center my-auto">
      WhenRUfree
    </Link>
    <NavigationMenu>
      <NavigationMenuItem className="list-none bg-transparent">
        <NavigationMenuTrigger className="bg-transparent hover:bg-accent focus:bg-accent">
          menu
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-20 flex-col flex bg-accent  top-10 gap-10 justify-center text-center backdrop-blur ">
          <Item title="Create Event" to="/create" />
          <Item title="infomation" to="/info" />
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  </nav>
);

export default Navigation;
