import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { endSession, fetchLogin, registerLogin } from "../ library/apiMethods";
import { randomString } from "../ library/randomString";
import { sha256 } from "../ library/sha256";
import { ErrorComponent } from "../components/errorComponent";
import { useLoading } from "../ library/useloading";
import { LoadingComponent } from "../components/loadingComponent";

/**
 * The actual method that handles login. Redirects to the provider endpoint
 * @param provider
 * @param config The config object, obtained from the server
 */
async function handleLogin(provider, config) {
    const {
        authorization_endpoint,
        response_type,
        scope,
        client_id,
        code_challenge_method,
    } = config[provider];

    //Code challenge state?
    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);

    //The url parameters we send to the provider
    const params = {
        response_type,
        response_mode: "fragment",
        client_id,
        state,
        scope,
        redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    //Code challenge stuff, if applicable
    if (code_challenge_method) {
        const code_verifier = randomString(50);
        window.sessionStorage.setItem("code_verifier", code_verifier);
        params.code_challenge_method = code_challenge_method;
        params.code_challenge = await sha256(code_verifier);
    }

    //Redirecting the user to the authorization endpoint
    window.location.href =
        authorization_endpoint + "?" + new URLSearchParams(params);
}

/**
 * Function that displays a waiting message to the user, posts the access_token to the server
 * (whichs signs it), then returns to the front page
 */
export function LoginCallback({ reload, config }) {
    const { provider } = useParams();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(async () => {
        const { access_token, error, error_description, state, code } =
            Object.fromEntries(
                new URLSearchParams(window.location.hash.substring(1))
            );

        const expected_state = window.sessionStorage.getItem("expected_state");
        if (!state || expected_state !== state) {
            setError("Unexpected state");
            return;
        }

        if (error || error_description) {
            setError(`Error: ${error} (${error_description})`);
            return;
        }

        if (code) {
            const { client_id, token_endpoint } = config[provider];
            const code_verifier = window.sessionStorage.getItem("code_verifier");
            const payload = {
                grant_type: "authorization_code",
                code,
                client_id,
                code_verifier,
            };
            const res = await fetch(token_endpoint, {
                method: "POST",
                body: new URLSearchParams(payload),
            });
            if (!res.ok) {
                setError(`Failed to fetch token ${res.status}: ${await res.text()}`);
                return;
            }
            const { access_token } = await res.json();
            await registerLogin(provider, { access_token });

            //This updates the user info for the site if we logged in with a code flow
            reload();
            navigate("/");
            return;
        }

        if (!access_token) {
            setError("Missing access_token");
            return;
        }

        await registerLogin(provider, { access_token });
        //This updates the user info for the site if we logged in with a token flow
        reload();
        navigate("/");
    }, []);

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return <h1>Fetching user info, please wait...</h1>;
}

function Login({ config }) {
    const { provider } = useParams();
    const { loading, error } = useLoading(() => handleLogin(provider, config));

    return <LoadingComponent message={"Redirecting to login, please wait"} />;
}

export function Logout({ reload }) {
    const navigate = useNavigate();
    useEffect(async () => {
        await endSession();
        reload();
        navigate("/");
    });
    return <h1>Please wait...</h1>;
}

export function LoginPage({ config, reload }) {
    return (
        <Routes>
            <Route path={"/:provider"} element={<Login config={config} />} />
            <Route
                path={"/:provider/callback"}
                element={<LoginCallback config={config} reload={reload} />}
            />
            <Route path={"/endsession"} element={<Logout reload={reload} />} />
        </Routes>
    );
}
