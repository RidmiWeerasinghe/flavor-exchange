import { useState } from "react"
import { useNavigate } from "react-router"
import { useUserStore } from "../store/userStore"

type FormData = {
    username: string,
    password: string,
}

export default function useLoginForm() {
    const user = useUserStore()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<FormData>({
        username: '',
        password: '',
    })

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        if (formValues.username === user.username && formValues.password === user.password) {
            user.setAuthenticated(true);
        }
    }

    const handleOnClickRegister = () => {
        navigate("/register")
    }

    return {
        formValues,
        handleFormInput,
        handleSubmit,
        handleOnClickRegister
    }
}
