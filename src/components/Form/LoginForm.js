import { CommonContainer, CommonForm, CommonLink, CommonInput, CommonSubmitButton } from "./Common";
import Marginer from "../Marginer";

export default function LoginForm() {
  return (
    <CommonContainer>
      <CommonForm>
        <CommonInput type="email" placeholder="Email" />
        <CommonInput type="password" placeholder="Password" />
        <Marginer direction="vertical" margin={5} />
        <CommonLink muted href="#">Forgot your password?</CommonLink>
        <Marginer direction="vertical" margin="1.3em" />
      </CommonForm>
      <CommonSubmitButton>Log in</CommonSubmitButton>
    </CommonContainer>
  );
}