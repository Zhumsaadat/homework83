import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import axiosApi from '../axiosApi';

const ProductForm: React.FC = () => {
    const [state, setState] = useState({
        name: '',
        image: null,
        info: '',
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', state.name);
            formData.append('info', state.info);
            formData.append('image', state.image);

            await axiosApi.post('/artists', formData);
            setState({
                name: '',
                image: null,
                info: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setState(prevState => ({ ...prevState, image: file }));
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        id="name"
                        label="Name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        name="name"
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="info"
                        label="Info"
                        value={state.info}
                        onChange={inputChangeHandler}
                        name="info"
                    />
                </Grid>
                <Grid item xs>
                    <input
                        type="file"
                        onChange={fileInputChangeHandler}
                        name="image"
                    />
                </Grid>
                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;
