import { useState } from "react"
import { useNavigate } from "react-router"

type FormData = {
    username: string,
    password: string,
}

export default function useLoginForm() {
    const navigation = useNavigate()
    const [formValues, setFormValues] = useState<FormData>({
        username: '',
        password: '',
    })

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        if (formValues.username === 'testUser' && formValues.password === 'pass') {
            navigation("/home")
        }
    }

    const handleOnClickRegister = () => {
        navigation("/register")
    }
    return {
        formValues,
        handleFormInput,
        handleSubmit,
        handleOnClickRegister
    }
}
