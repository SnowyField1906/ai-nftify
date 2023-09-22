import React, { useState } from 'react'
import { logo } from '../data'
import { useLocation } from 'react-router-dom';
import { getGoogleUrl } from '../helpers';
import { useGoogleLogin } from "@react-oauth/google"
import { getGoogleToken } from "../utils/googleToken"
import { getPrivateKey } from "../utils/fetch-privateKey"
import axios from 'axios';
function Login({ setLoginPopup }) {
  const location = useLocation();
  const [masterKey, setMasterKey] = useState();


  const handleReconstructMasterKey = async (email, jwt) => {
    const data = await getPrivateKey({ owner: email, verifier: "google", idToken: jwt });
    // console.log(data.privKey.toString("hex"));
    // setMasterKey({
    //   privKey: data.privKey.toString("hex"),
    //   ethAddress: data.ethAddress
    // });
    console.log(data);
  }

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        // Use Axios to fetch user email
        const { data: tokens, error } = await getGoogleToken({ code: tokenResponse.code });
        // console.log(tokens.id_token);

        // Add the code to fetch user's email here
        const access_token = tokens.access_token;
        const userinfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        const response = await axios.get(userinfoUrl, { headers });

        if (response.status === 200) {
          const userData = response.data;
          console.log(userData)
          const userEmail = userData.email;
          handleReconstructMasterKey(userEmail, tokens.id_token)
        } else {
          console.error(`Failed to fetch user info. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onError: error => {
      throw Error(error)
    },
    flow: "auth-code",
  });
  return (
    <div className='-translate-x-5 -translate-y-5 fixed z-10 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div class="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div class="rounded-xl bg-white shadow-xl w-full">
          <div class="p-6 sm:p-16">
            <div class="space-y-4">
              <img src={logo} loading="lazy" class="w-10" alt="tailus logo" />
              <h2 class="mb-8 text-2xl text-cyan-900 font-bold">Sign in to unlock the best of NFT Origin.</h2>
            </div>
            <div class="mt-16 grid space-y-4">
              <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100" href={getGoogleUrl('/')}>
                <div class="relative flex items-center space-x-4 justify-center">
                  <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" class="absolute left-0 w-5" alt="google logo" />

                  <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base" onClick={() => login()}>Continue with Google</span>
                </div>
              </button>
              <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div class="relative flex items-center space-x-4 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Github</span>
                </div>
              </button>
            </div>

            <div class="mt-8 space-y-4 text-gray-600 text-center sm:-mb-8">
              <p class="text-xs">Your account will be authorized by Key-Shared technology.</p>
              <p class="text-xs">We are responsible to your data privacy and protection.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='h-screen w-screen absolute -z-10' onClick={() => setLoginPopup(false)}></div>
    </div >
  )
}

export default Login
