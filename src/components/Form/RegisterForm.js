import { CommonContainer, CommonForm, CommonLink, CommonInput, CommonSubmitButton } from "./Common";
import Marginer from "../Marginer";

export default function RegisterForm(props) {
  return (
    <CommonContainer>
      <CommonForm>
        <CommonInput type="text" placeholder="Username" />
        <CommonInput type="email" placeholder="Email" />
        <CommonInput type="password" placeholder="Password" />
        <CommonInput type="password" placeholder="Confirm Password" />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <CommonSubmitButton>Register</CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <CommonLink muted>Already have an account? <CommonLink bold onClick={props.switchForm}>Log In</CommonLink></CommonLink>
    </CommonContainer>
  );
}