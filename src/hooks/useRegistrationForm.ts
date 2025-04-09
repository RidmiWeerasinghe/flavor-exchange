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
    const user = useUserStore()
    const [formValues, setFormValues] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        user.setId(1)
        user.setUsername(formValues.username)
        user.setPassword(formValues.password)
        navigate("/")
    }

    const handleClickLogin = () => {
        navigate("/")
    }
    return {
        formValues,
        handleFormInput,
        handleSubmit,
        handleClickLogin
    }
}

