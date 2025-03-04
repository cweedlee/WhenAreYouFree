import { useForm, type FieldValues } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import api from "~/utils/api";

export default function LoginPage() {
  const form = useForm({ mode: "onBlur" });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    api.post("/login", data as URLSearchParams).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-max max-w-[20rem] min-w-[10rem] px-auto m-[4rem]">
      <div className="flex bg-accent">
        <h2>Login</h2>
      </div>
      <form
        className="w-full rounded-b-2xl"
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <Input {...form.register("username")} placeholder="username" />
        <Input {...form.register("password")} placeholder="password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
