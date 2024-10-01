import React from 'react';
import { useAuth, hasAuthParams } from "react-oidc-context";
import DisplayData from './DisplayData.js';
import Display from './Display.js';

function Sample(props) {

    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = React.useState(false);

    // automatically sign-in
    React.useEffect(() => {
        if (!hasAuthParams() &&
            !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
            !hasTriedSignin
        ) {
            auth.signinRedirect();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);

    if (auth.isLoading) {
        return <div>Signing you in/out...</div>;
    }

    if (!auth.isAuthenticated) {
        return <div>Unable to log in</div>;
    }

    if (auth.isAuthenticated) {
        return (
        <div>
            {/* <DisplayData
                apiUrl={props.apiUrl}
                labels={props.labels}
            /> */}
            <Display />
        </div>
        );
    }

}

export default Sample;
