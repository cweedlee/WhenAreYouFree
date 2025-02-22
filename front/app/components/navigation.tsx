import type { MouseEventHandler } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/ui/navigation-menu";

const itemStyle = "list-none margin-10 padding-10 align-center";

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
    <NavigationMenuItem className={cn(itemStyle, className)}>
      {to ? (
        <Link to={to}>{title}</Link>
      ) : onClick ? (
        <button onClick={onClick}>{title}</button>
      ) : (
        <button>{title}</button>
      )}
    </NavigationMenuItem>
  );
};

const Navigation = () => (
  <nav className="flex w-full max-w-full backdrop-blur h-10 top-0 left-0 bg-red-400/20 gap-4 px-10 z-50 justify-between">
    <Item title="WhenRUfree" to="/" className="font-black " />
    <NavigationMenu>
      <NavigationMenuItem className="list-none bg-transparent">
        <NavigationMenuTrigger className="bg-transparent hover:bg-accent focus:bg-accent">
          menu
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-10 flex-col bg-amber-400">
          <Item title="Create Event" to="/create" />
          <Item title="infomation" to="/info" />
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  </nav>
);

export default Navigation;
