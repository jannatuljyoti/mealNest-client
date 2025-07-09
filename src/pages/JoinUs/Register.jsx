import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const {register, handlesubmit, formState:{errors}} = useForm();
    const {createUser} = useAuth();


    return (
        <div>
            register
        </div>
    );
};

export default Register;