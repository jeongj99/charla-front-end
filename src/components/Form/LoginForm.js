import { CommonContainer, CommonForm, CommonLink, CommonInput, CommonSubmitButton } from "./Common";
import Marginer from "../Marginer";

export default function LoginForm(props) {
  return (
    <CommonContainer>
      <CommonForm>
        <CommonInput type="email" placeholder="Email" />
        <CommonInput type="password" placeholder="Password" />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <CommonLink muted href="#">Forgot your password?</CommonLink>
      <Marginer direction="vertical" margin="1.6em" />
      <CommonSubmitButton>Log in</CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <CommonLink muted>Don't have an account? <CommonLink bold onClick={props.switchForm}>Register</CommonLink></CommonLink>
    </CommonContainer>
  );
}