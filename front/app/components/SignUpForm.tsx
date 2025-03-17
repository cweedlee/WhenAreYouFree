import { useForm } from "react-hook-form";
import InputLabel from "./input-label";
import Callout from "./callout";
import { Button } from "./ui/button";
import api from "~/utils/api";
import { type SignUpUserType } from "~/types/userTypes";

const signUp = async (data: SignUpUserType, eventCode: string) => {
  return await api
    .post("user/register", data, { eventCode })
    .then(console.log)
    .catch((err) => {
      console.log(err);
    });
};

const SignUpForm = ({ eventCode }: { eventCode: string }) => {
  const { register, handleSubmit } = useForm<SignUpUserType>();
  const onSubmit = (data: SignUpUserType) => {
    console.log(data);
    signUp(data, eventCode);
  };
  return (
    <Callout>
      <p>Sign up to add your schedule</p>
      <InputLabel
        label="Email"
        placeholder="Email"
        required
        name="email"
        register={register("email")}
      />
      <InputLabel
        label="Password"
        placeholder="Password"
        required
        name="password"
        register={register("password")}
        type="password"
      />
      <InputLabel
        label="username"
        placeholder="Nickname"
        name="username"
        register={register("username")}
      />
      <Button
        type="submit"
        className="btn-primary"
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </Callout>
  );
};
export default SignUpForm;
