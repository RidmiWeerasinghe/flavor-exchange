import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import UseRegistrationForm from '../../hooks/useRegistrationForm'

export default function RegistrationFrom() {
    const {
        formValues,
        handleFormInput,
        handleSubmit,
        handleClickLogin
    } = UseRegistrationForm();

    return (
        <Stack spacing={2}>
            <Typography variant="h3" gutterBottom>
                Register
            </Typography>
            <TextField id="outlined-basic" label="Username" name='username' value={formValues.username} variant="outlined" onChange={handleFormInput} required />
            <TextField type='password' id="outlined-basic" label="Password" name='password' value={formValues.password} variant="outlined" onChange={handleFormInput} required />
            <TextField type='password' id="outlined-basic" label="Confirm Password" name='confirmPassword' value={formValues.confirmPassword} variant="outlined" onChange={handleFormInput} required />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Typography variant="body1">ALready have an account? <Typography onClick={handleClickLogin} color="primary" sx={{ cursor: 'pointer' }}>log in here</Typography></Typography>
        </ Stack>
    )
}

