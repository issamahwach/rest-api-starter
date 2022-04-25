import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        fullName: string({
            required_error: 'Fullname is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(5, "Password is too short"),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Email is not valid')
    }).refine((data)=> data.password = data.passwordConfirmation, {
        message: 'Password mismatch',
        path: ["passwordConfirmation"]
    })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;

