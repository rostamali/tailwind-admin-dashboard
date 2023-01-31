import * as Yup from 'yup';

export const signupValidation = Yup.object().shape({
	name: Yup.string()
		.required('Fullname is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must not exceed 20 characters'),
	email: Yup.string().required('Email is required').email('Email is invalid'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});

export const signinValidation = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Email is invalid'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});
