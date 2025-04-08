import { Button, Stack, TextField, Typography } from "@mui/material";
import useLoginForm from "../../hooks/useLoginForm";

export default function LoginForm() {
    const {
        formValues,
        handleFormInput,
        handleSubmit,
        handleOnClickRegister
    } = useLoginForm()

    return (
        <Stack spacing={2} className="flex items-center">
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField id="outlined-basic" label="Username" variant="outlined" name='username' value={formValues.username} onChange={handleFormInput} required />
            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" name='password' value={formValues.password} onChange={handleFormInput} required />
            <Button variant="contained" onClick={handleSubmit}>Log in</Button>
            <Typography variant="body1">Do not have an account?</Typography>
            <Typography onClick={handleOnClickRegister} color="primary" sx={{ cursor: 'pointer' }}>register here</Typography>
        </ Stack>
    )
}
