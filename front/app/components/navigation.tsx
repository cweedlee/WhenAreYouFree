import { useState } from "react";
import { Link } from "react-router";
import api from "~/utils/api";
import { useUser } from "~/utils/useUser";

const itemStyle = "list-none align-center my-auto px-[2rem] py-4 text-xl";

const Item = ({
  setIsOpen,
  children,
}: {
  setIsOpen: () => void;
  children: React.ReactNode;
}) => {
  return <button onClick={setIsOpen}>{children}</button>;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUser();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex w-full max-w-full backdrop-blur bg-background/80 top-0 left-0 shadow-md gap-4 px-5 z-50 justify-between h-[3rem] align-center fixed">
      <Link to="/" className="font-black align-center justify-center my-auto">
        WhenRUfree
      </Link>
      {user && <p>{user?.username}</p>}
      <img
        src={`${import.meta.env.VITE_URL}/calender.gif`}
        alt="logo"
        className="w-10 h-10"
      />
      <div className="flex gap-4 w-max align-center justify-end">
        <button
          className={`hover:bg-accent rounded-sm p-1 focus:bg-accent z-50 right-[1rem] h-max my-auto mx-0 ${
            isOpen
              ? "bg-background  border-1 border-black shadow-md"
              : "bg-transparent"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          menu
        </button>
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } w-screen h-screen scroll-none fixed top-0 left-0 z-[100] items-center justify-center bg-black/30`}
          onClick={toggleOpen}
        >
          <div
            className="container relative flex-col bg-background/95 w-max h-max z-[60] flex p-[3rem] shadow-md border-1 border-black text-center"
            onClick={toggleOpen}
          >
            <Link
              to="/create"
              className={itemStyle}
              onClick={(e) => {
                if (user) {
                  e.preventDefault();
                  alert(
                    "User can Get only 1 event right now\nWill be updated soon"
                  );
                }
              }}
            >
              Create Event
            </Link>
            <Link to="/information" className={itemStyle}>
              infomation/usage
            </Link>
            {!user && (
              <Link to="/login" className={itemStyle}>
                login
              </Link>
            )}
            {user && (
              <>
                <Link to={`/event/${user.eventCode}`} className={itemStyle}>
                  My Event
                </Link>
                <button
                  onClick={() => {
                    toggleOpen();
                    api.removeToken();
                    setUser(null);
                  }}
                  className={itemStyle}
                >
                  Logout
                </button>
              </>
            )}
            <div
              content="fontSize"
              className={
                itemStyle + " flex gap-2 justify-center w-full align-center"
              }
            >
              <button
                className="text-4xl/10 font-light rounded-full border-1 border-black size-12"
                onClick={() => {
                  console.log(document.body.style.fontSize);
                }}
              >
                +
              </button>
              <p className="!text-xl p-2">font size</p>
              <button className="text-4xl/1 font-light rounded-full border-1 border-black size-12">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
