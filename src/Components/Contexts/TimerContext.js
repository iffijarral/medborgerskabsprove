import { createContext, useState } from "react";

//export const LoginContext = createContext({});
const TimerContext = createContext(null);

const { Provider } = TimerContext; 

const TimerProvider = ({ children }) => {
    const [timer, setTimer] = useState();

    return (
        <Provider
            value={{
                timer,
                setTimer
            }}
        >
            {children}
        </Provider>
    )
};

export { TimerContext, TimerProvider };