import { useNavigate } from "react-router"
import { useUserStore } from "../store/userStore"
import { useState } from "react"

type FormData = {
    username: string,
    password: string,
    confirmPassword: string,
}

export default function UseRegistrationForm() {
    const navigate = useNavigate()
    const user = useUserStore.getState()
    const [formValues, setFormValues] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        user.setUsername(formValues.username)
        user.setPassword(formValues.password)
        navigate("/login")
    }

    const handleClickLogin = () => {
        navigate("/login")
    }
    return {
        formValues,
        handleFormInput,
        handleSubmit,
        handleClickLogin
    }
}

