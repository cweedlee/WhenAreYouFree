import { Form, useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form as ShadForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import api from "~/utils/api";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Page from "~/components/page";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "at least you should write something to tell it's you" })
    .max(20, { message: "max 20 characters" }),
  eventName: z
    .string()
    .min(4, { message: "min 4 characters" })
    .max(50, { message: "max 50 characters" }),
  password: z
    .string()
    .min(4, { message: "min 4 characters" })
    .max(50, { message: "max 50 characters" }),
  email: z.string().email({ message: "invalid email" }).optional(),
  eventDuration: z.enum(["day", "week", "month", "year", "custom"]),
});

const MyFormField = ({
  form,
  name,
  label,
  ...props
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2 ">
            <FormLabel className="my-auto font-extrabold text-gray-500">
              {label}
            </FormLabel>
            <FormMessage className="mt-0" />
          </div>
          <FormControl>
            <Input
              {...field}
              {...props}
              className=" border-r-0 border-l-0 border-t-0  focus:outline-none focus-visible:outline-red-600 focus:bg-accent focus:ring-0"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const MyFormSelector = ({
  form,
  name,
  label,
  options,
  defaultValue = "",
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2 ">
            <FormLabel className="my-auto font-extrabold">{label}</FormLabel>
            <FormMessage className="mt-0" />
          </div>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    defaultChecked={defaultValue === option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default function CreatePage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Host",
      eventName: "New Event",
    },
  });

  const times = {
    day: 86400000,
    week: 604800000,
    month: 2628000000,
    year: 31540000000,
    custom: 0,
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // set default value for selector
    if (values.eventDuration === undefined) {
      values.eventDuration = "week";
    }
    // set duration start, end
    const durationStart = new Date();
    const durationEnd = new Date(
      durationStart.getTime() + times[values.eventDuration]
    );

    console.log(durationStart, durationEnd);
    const data = {
      username: values.username,
      eventName: values.eventName,
      password: values.password,
      email: values.email || "",
      durationStart: durationStart.toDateString(),
      durationEnd: durationEnd.toDateString(),
    };

    api.post("/event", new URLSearchParams(data)).then((res) => {
      console.log(res);
      navigate(`/event/${res.data.eventCode}`);
    });
  }
  useEffect(() => {
    form.setValue("eventDuration", "week");
  }, []);
  return (
    <Page>
      <div className="flex flex-col  gap-4 mx-10 lg:mx-20  my-10">
        <div className="justify-center">
          <h1 className="text-2xl font-bold">Create Event</h1>

          <ShadForm {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 my-4 justify-center"
            >
              <MyFormField form={form} name="username" label="created by" />
              <MyFormField form={form} name="eventName" label="event title" />
              <MyFormField
                form={form}
                name="password"
                label="password"
                props={{
                  type: "password",
                  placeholder: "optional",
                  defaultValue: "",
                }}
              />
              <MyFormField form={form} name="email" label="email" />
              <MyFormSelector
                form={form}
                name="eventDuration"
                label="happens in"
                options={[
                  { label: "in 24hr", value: "day" },
                  { label: "in a week", value: "week" },
                  { label: "in a month", value: "month" },
                  { label: "in a year", value: "year" },
                  { label: "custom", value: "custom" },
                ]}
                defaultValue="week"
              />
              <Button type="submit" className="bg-primary w-50">
                create
              </Button>
            </form>
          </ShadForm>
        </div>
        <div
          content="example"
          className="text-sm text-gray-500 w-full h-30 bg-red-100 "
        />
      </div>
    </Page>
  );
}
