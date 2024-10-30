import { signInWithGoogle } from "../auth"

export const Login = () => {

    function clickHandler() {
        signInWithGoogle()
    }

    return (
        <>
        <button onClick={clickHandler}>
            login
        </button>
        </>
    )
}