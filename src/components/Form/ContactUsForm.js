import { useState } from "react";
import axios from "../../api/axios";

import {
  CommonContainer,
  CommonForm,
  CommonInput,
  CommonSubmitButton,
} from "./Common";
import Marginer from "../Marginer";

import { RiErrorWarningLine } from "react-icons/ri";

export default function RegisterForm(props) {
  const [fullName, setFullName] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    const response = await axios.post("api/feedback", {
      fullName,
      feedback,
    });

    if (response.data.error) {
    } else {
      setFullName("");
      setFeedback("");
    }
  };

  return (
    <CommonContainer>
      <CommonForm>
        <CommonInput
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={setFullName}
        />
        <CommonInput
          type="text"
          placeholder="Feedback"
          value={feedback}
          onChange={setFeedback}
        />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <CommonSubmitButton onClick={submitFeedback}>Submit</CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
    </CommonContainer>
  );
}
