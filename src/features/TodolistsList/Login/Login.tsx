import React from 'react';
import {Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {CheckBox} from '@mui/icons-material';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {loginTC, LoginThunkDispatch} from './login-reducer';

export const Login = () => {
    const useAppDispatch = () => useDispatch<LoginThunkDispatch>();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {email: 'email is required'}
            }
            if (!values.password) {
                return {password: 'password is required'}
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        }
    });

    return <Grid
        container
        justifyContent={'center'}
    >
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a
                            href={'https://social-network.samuraijs.com/'}
                            target={'_blank'}
                        >here</a>
                        </p>
                        <p>
                            or common test account credentials:
                        </p>
                        <p>
                            Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            style={{padding: '10px'}}
                            label={'remember me'}
                            control={
                                <CheckBox
                                    {...formik.getFieldProps('rememberMe')}
                                    //checked={formik.values.rememberMe}
                                />
                            }
                        />
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                        >
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};