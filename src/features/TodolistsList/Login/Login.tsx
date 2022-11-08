import React from 'react';
import {Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {CheckBox} from '@mui/icons-material';

export const Login = () => {
    return <Grid
        container
        justifyContent={'center'}
    >
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>

                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        margin="normal"
                    />
                    <FormControlLabel
                        label={'Remember me'}
                        control={<CheckBox name="rememberMe"/>}
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
        </Grid>
    </Grid>
};