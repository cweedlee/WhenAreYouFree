import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import Page from "~/components/page";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import api from "~/utils/api";
import useUser from "~/utils/useUser";

export default function LoginPage() {
  const form = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  useEffect(() => {
    if (user) {
      navigate("/event/" + user.eventCode);
    }
  }, [user]);

  const onSubmit = (data: FieldValues) => {
    api
      .post("/user/login", data as URLSearchParams, undefined, {
        withCredntials: true,
      })
      .then((res) => {
        api.setToken(res.headers.authorization);
        localStorage.setItem("eventCode", res.data.eventCode);
        navigate("/event/" + res.data.eventCode);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page>
      <div className="min-w-[10rem] w-[60%] mx-auto gap-y-10 flex flex-col">
        <div className="flex">
          <h1>Login</h1>
        </div>
        <form
          className="w-full rounded-b-2xl flex flex-col gap-y-4"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
        >
          <Input {...form.register("username")} placeholder="username" />
          <Input {...form.register("password")} placeholder="password" />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </Page>
  );
}
