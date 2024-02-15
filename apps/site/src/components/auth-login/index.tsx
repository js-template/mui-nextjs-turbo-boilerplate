"use client";
import { authenticate } from "@/lib/actions";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AuthLogin = ({ callbackUrl, error }: { error: string | undefined; callbackUrl: string | undefined }) => {
   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         identifier: "",
         password: ""
      }
   });

   // *** Handle Submit
   const onSubmit = async (data: any) => {
      setLoading(true);

      await authenticate("credentials", {
         email: data.identifier,
         password: data.password,
         redirect: true,
         callbackUrl: callbackUrl || process.env.NEXTAUTH_URL
      }).then(() => {
         setLoading(false);
      });
   };

   return (
      <Paper
         sx={{
            maxWidth: "400px",
            width: "100%",
            p: 4,
            mx: "auto", // 'auto' is not working, so I used 'center'
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
         }}>
         <Grid container direction='column' justifyContent='center' spacing={2}>
            <Grid item xs={12} container alignItems='center' justifyContent='center'>
               <Box sx={{ mb: 2 }}>
                  <Typography variant='subtitle1'>Sign in with Email address</Typography>
               </Box>

               <Box
                  component='form'
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     gap: 2,
                     width: "100%",
                     "& .MuiTextField-root": { width: "100%" }
                  }}
                  noValidate
                  autoComplete='off'
                  onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                     hiddenLabel
                     id='identifier'
                     defaultValue=''
                     placeholder='Username or Email'
                     variant='outlined'
                     size='medium'
                     fullWidth
                     {...register("identifier", {
                        required: "This field is required"
                     })}
                     helperText={errors.identifier?.message}
                     error={!!errors.identifier}
                  />
                  <TextField
                     hiddenLabel
                     id='password'
                     placeholder='Password'
                     defaultValue=''
                     variant='outlined'
                     size='medium'
                     type='password'
                     fullWidth
                     {...register("password", {
                        required: "This field is required"
                     })}
                     helperText={errors.password?.message}
                     error={!!errors.password}
                  />
                  <LoadingButton
                     type='submit'
                     variant='contained'
                     loading={loading}
                     loadingPosition='start'
                     size='large'
                     fullWidth
                     sx={{ mt: 2 }}>
                     Sign in
                  </LoadingButton>
               </Box>
            </Grid>

            <Grid item xs={12}>
               <Box
                  sx={{
                     alignItems: "center",
                     display: "flex"
                  }}>
                  <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />

                  <Button
                     variant='outlined'
                     sx={{
                        cursor: "unset",
                        m: 2,
                        py: 0.5,
                        px: 7,
                        fontWeight: 500,
                        borderRadius: "10px"
                     }}
                     disableRipple
                     disabled>
                     OR
                  </Button>

                  <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />
               </Box>
            </Grid>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2
               }}>
               <IconButton
                  size='large'
                  // onClick={handleOpenNavMenu}
                  color='secondary'
                  sx={{
                     p: 1,
                     borderRadius: 2,
                     border: "1px solid"
                  }}
                  onClick={() => {
                     toast.error("Google Sign in is not implemented yet");
                  }}>
                  <GoogleIcon />
               </IconButton>
               {/* GitHub */}
               <IconButton
                  size='large'
                  // onClick={handleOpenNavMenu}
                  color='secondary'
                  sx={{
                     p: 1,
                     borderRadius: 2,
                     border: "1px solid"
                  }}
                  onClick={() => {
                     toast.error("GitHub Sign in is not implemented yet");
                  }}>
                  <GitHubIcon />
               </IconButton>
            </Box>
         </Grid>
      </Paper>
   );
};

export default AuthLogin;
