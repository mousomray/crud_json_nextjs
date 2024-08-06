import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { editquestion, singlequestion } from '../apicall/apicall';
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from "react-redux"; // Import Use Dispatch
import { CircularProgress } from "@mui/material"; // Circle Loader 



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const index = () => {

    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Get product For Single Value (Start)
    const getQuestion = async () => {
        try {
            const response = await dispatch(singlequestion(id));

            const reg = {
                question: response?.payload?.question,
                answer: response?.payload?.answer
            };
            reset(reg)

        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getQuestion, queryKey: ['singlequestion', id] }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)

    const onSubmit = async (data) => {

        setLoading(true);

        const reg = {
            question: data.question,
            answer: data.answer
        };

        try {
            const response = await dispatch(editquestion({ data: reg, id }))
            console.log("Resss", response);
            if (response && response?.type === 'editquestion/fulfilled') {
                router.push('/answer')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);

        }
    }

    return (
        <>


            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 15,
                            marginBottom: 8,
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.12)'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Question
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="question"
                                        required
                                        fullWidth
                                        id="question"
                                        label="Question"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("question", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "Title must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.question && (
                                        <p style={{ color: 'red' }}>{errors.question.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="answer"
                                        required
                                        fullWidth
                                        id="answer"
                                        label="Answer"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("answer", {
                                            required: "This field is Required",
                                        })}
                                    />
                                    {errors?.answer && (
                                        <p style={{ color: 'red' }}>{errors.answer.message}</p>
                                    )}
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? <CircularProgress /> : "Edit"}
                            </Button>

                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>


        </>
    )
}

export default index