import { useState } from "react";
import { z } from "zod";


type FormValues = {
    [key: string]: string
}
type ErrorsObj = {
    [key: string]: string
}

const nameErrorMsg = "Name must be minimum 3 characters and maximum 50 characters long";
const emailErrorMsg = "Must be a valid email address";
const passwordErrorMsg = "Password must contains minimun 8 characters";
const phoneErrorMsg = "Must be a valid phone number";

const initalErrorState = {
    name: nameErrorMsg,
    email: emailErrorMsg,
    password: passwordErrorMsg
}
function useForm<T extends FormValues>(initialState: T): [
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    T,
    ErrorsObj
] {

    const [formValues, setFormValues] = useState<T>(initialState);
    const [errors, setErrors] = useState<ErrorsObj>(initalErrorState);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
        if (name === "name") {
            const nameSchema = z.string().trim().min(3).max(50);
            if (nameSchema.safeParse(value).success) {
                setErrors(prev => {
                    const { name, ...obj } = prev;
                    return obj;
                })
            } else {
                setErrors(prev => ({
                    ...prev,
                    name: nameErrorMsg
                }))
            }
        }
        if (name === "email") {
            const emailSchema = z.string().trim().email();
            if (emailSchema.safeParse(value).success) {
                setErrors(prev => {
                    const { email, ...obj } = prev;
                    return obj;
                })
            } else {
                setErrors(prev => ({
                    ...prev,
                    email: emailErrorMsg
                }))
            }
        }
        if (name === "phone") {
            const phoneSchema = z.string().trim().min(10).max(20).refine((value) => /^\+\d{1,3}\s\d+$/.test(value));
            if (value === "" || phoneSchema.safeParse(value).success) {
                setErrors(prev => {
                    const { phone, ...obj } = prev;
                    return obj;
                })
            } else {
                setErrors(prev => ({
                    ...prev,
                    phone: phoneErrorMsg
                }))
            }
        }
        if (name === "password") {
            const passwordSchema = z.string().trim().min(8).max(71);
            if (passwordSchema.safeParse(value).success) {
                setErrors(prev => {
                    const { password, ...obj } = prev;
                    return obj;
                })
            } else {
                setErrors(prev => ({
                    ...prev,
                    password: passwordErrorMsg
                }))
            }
        }
    }

    return [handleChange, formValues, errors];
}

export default useForm;