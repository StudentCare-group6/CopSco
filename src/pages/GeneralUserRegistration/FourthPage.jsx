import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import otpImg from '../../images/otp.png';
import Timer from '../../components/GeneralUserRegistration/Timer';
import useFormContext from '../../hooks/useFormContext';
import Steppers from '../../components/GeneralUserRegistration/Steppers';

export default function FourthPage() {

    const { data, handleChange, form, register, control, errors } = useFormContext();

    return (
        <div>
             <Steppers step={2} />
            <Grid container spacing={2} sx={{ marginTop: '8%' }}>
            <Stack sx={{ width: '100%' }} alignItems='center'>
                <img src={otpImg} className='w-52' />
            </Stack>
            <Timer />
            <Grid container spacing={2} >
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div class="w-16 h-16 ">
                            <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1" />
                        </div>
                        <div class="w-16 h-16 ">
                            <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1" />
                        </div>
                        <div class="w-16 h-16 ">
                            <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1" />
                        </div>
                        <div class="w-16 h-16 ">
                            <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1" />
                        </div>
                    </div>

                </Grid>

            </Grid>
            </Grid>
        </div>
    );
}