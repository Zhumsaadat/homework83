import React, { FormEvent, useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RegisterMutation } from '../../../types';
import { selectRegisterError } from '../../store/users/usersSlice';
import { newUser } from '../../store/users/usersThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);

  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(newUser(state)).unwrap();
      navigate('/');
    } catch (err) {

    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                name="email"
                value={state.email}
                onChange={inputChangeHandler}
                autoComplete="new-email"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;