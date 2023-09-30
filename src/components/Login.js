import { logo } from '../data'
import { useGoogleLogin } from "@react-oauth/google"
import { getGoogleToken } from "../utils/googleToken"
import { getPrivateKey } from "../utils/fetch-privateKey"
import axios from 'axios';
import { getInfoUser, storeInfoUser } from '../storage/local';
import { useState } from 'react';
import { checkAddressExists, getWalletByEmail, postWallet } from '../helpers';

function Login({ setSuccess, setLoginPopup }) {
  const handleReconstructMasterKey = async (email, jwt) => {
    const data = await getPrivateKey({ owner: email, verifier: "google", idToken: jwt });
    return data;
  }

  const [loggingIn, setLoggingIn] = useState(false)

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        setLoggingIn(true)
        const { data: tokens } = await getGoogleToken({ code: tokenResponse.code });

        const { access_token, id_token, refresh_token } = tokens;

        const userinfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        const response = await axios.get(userinfoUrl, { headers });

        if (response.status === 200) {
          const wallet = await getWalletByEmail(response.data.email)
          const address = await checkAddressExists(response.data.email)

          const data = response.data
          let key = await handleReconstructMasterKey(response.data.email, tokens.id_token)
          let btcAddress

          if (!address) {
            btcAddress = await axios.get(
              `${process.env.REACT_APP_NODE1_ENDPOINT}/bitcoins/`, {
              headers: { 'Content-Type': 'application/json', }
            }).then(res => res.data.address)

            await postWallet({
              id: data.id,
              email: data.email,
              address: {
                btc: btcAddress,
                eth: key.data.ethAddress
              },
              publicKey: address.publicKey
            }, access_token)
          } else {
            btcAddress = address.address.btc
          }

          key.data["btcAddress"] = btcAddress
          storeInfoUser({ key, data, tokens: { access_token, id_token, refresh_token } })

          setSuccess(true)
          setLoginPopup(false)
        } else {
          console.error(`Failed to fetch user info. Status code: ${response.status}`);
        }
        setLoggingIn(false)
      } catch (error) { }
    },
    onError: error => {
      throw Error(error)
    },
    flow: "auth-code",
  });

  return (
    <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
      <div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="rounded-xl bg-white shadow-xl w-full px-16 py-5">
          <div className='flex items-center mb-10 mt-4 gap-5'>
            <img src={logo} loading="lazy" className="w-10" />
            <h2 className="font-extrabold text-xl text-gray-800">Sign in to unlock the best of NFT Origin.</h2>
          </div>
          <div class="container mx-auto">
            <div className='grid gap-2'>
              <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-primary-500 focus:bg-primary-500 disabled:border-primary-500" onClick={() => login()} disabled={loggingIn}>
                <div className="relative flex items-center space-x-4 justify-center">
                  <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-5" alt="google logo" />
                  {
                    loggingIn ?
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                      </>
                      :
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-primary-600 sm:text-base">Continue with Google</span>
                  }
                </div>
              </button>
              {/* <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-primary-500 focus:bg-primary-50 active:bg-primary-100">
                <div className="relative flex items-center space-x-4 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  {
                    loggingIn ?
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                      :
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-primary-600 sm:text-base">Continue with GitHub</span>
                  }
                </div>
              </button> */}
            </div>
          </div>
          <div className="py-10 space-y-2 text-gray-600 text-center sm:-mb-8">
            <p className="text-xs">Your account is authorized by{' '}
              <a href="https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620" target="_blank" rel="noreferrer"
                className="text-blue-700 hover:text-blue-800 hover:underline">Distributed Key Management</a>
              {' '}technology. We are responsible to your data privacy and protection.</p>
            <p className="text-xs">Account will be in local storage after logging in. Make sure you are not using public device or being hacked.</p>
          </div>
        </div>
      </div>
      <div className='h-screen w-screen absolute -z-10' onClick={() => !loggingIn && setLoginPopup(false)}></div>
    </div >
  )
}

export default Login
