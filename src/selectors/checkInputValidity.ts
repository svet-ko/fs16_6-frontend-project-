function checkInputValidity(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  isInputValid: boolean,
  setValidity: (params: boolean) => void,
  setValidityMessage: (params: string) => void
) {
  if (e.target.type !== "password") {
    setValidity(e.target.validity.valid);
    if (isInputValid) {
      setValidityMessage("");
    } else {
      setValidityMessage(e.target.validationMessage);
    }
  } else {
    const passw = /^\w{6,10}$/;
    if (e.target.value.match(passw)) {
      setValidity(true);
      setValidityMessage("");
    } else {
      setValidity(false);
      setValidityMessage(
        "Length of password should not be shorter 6 and longer 10 symbols"
      );
    }
  }
}

export { checkInputValidity };
