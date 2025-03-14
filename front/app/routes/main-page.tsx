import Page from "~/components/page";
import { Button } from "~/components/ui/button";
import Callout from "~/components/callout";
import { Input } from "~/components/ui/input";
import { useNavigate } from "react-router";
const mainPage = () => {
  const navigate = useNavigate();
  return (
    <Page className="justify-center text-center">
      <h1>Find the Perfect Time for Everyone</h1>
      <p>you can set schedule with your friends, collegues, and else....</p>
      <div className="flex flex-col gap-y-4 justify-center mx-auto lg:flex-row gap-x-20">
        <Callout className="w-full lg:w-1/2">
          <h2>Create New Event</h2>
          <p>Create a new event to start scheduling.</p>
          <Button className="w-max px-10" onClick={() => navigate("/create")}>
            Create Event
          </Button>
        </Callout>
        <div className="flex flex-col gap-y-4 w-full lg:w-1/2">
          <Callout>
            <h2>I already have an account</h2>
            <Button className="w-max px-10" onClick={() => navigate("/login")}>
              Login
            </Button>
            <h3 className="text-stone-500 ">OR</h3>
            <h2>Join Event</h2>
            <div className="flex gap-x-2 w-[60%] min-w-80 mx-auto">
              <Input placeholder="event code" className="bg-background" />
              <Button>Join Event</Button>
            </div>
          </Callout>
        </div>
      </div>
    </Page>
  );
};

export default mainPage;
