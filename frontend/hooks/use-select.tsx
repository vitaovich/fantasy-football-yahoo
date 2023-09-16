import { ChangeEvent, FocusEvent, useState } from "react";

const useSelect = (input: string, validateValue: (value:string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState<string>(input);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setEnteredValue(event.currentTarget.value)
    }

    const inputBlurHandler = (_event: FocusEvent<HTMLSelectElement>) => {
        setIsTouched(true)
    }

    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }

    return {
        value: enteredValue, isValid: valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset
    }
}

export default useSelect