export type authDataType = {
    id: string
    login: string
    email: string
}
export type LoginDataType = FormikErrorType & {
    captcha?: boolean
}

export type FormikErrorType = {
    email: string
    password: string
    rememberMe: boolean
}