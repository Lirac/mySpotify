import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
// import { loginUrl } from '../services/spotify'

const Login = ({ providers }) => {
  return (
    <div className="">
      <div className="p-8 flex flex-col justify-center items-center gap-8 h-[100vh]">
        <img src="pngegg.png" alt="spotify logo" className="w-48" />
        {Object.values(providers).map(provider => (
          <div key={provider?.name}>
            <button
              className="py-4 px-16 bg-green-500 rounded-3xl uppercase font-bold text-white text-sm cursor-pointer hover:bg-green-500/90"
              onClick={() => {
                signIn(provider.id, { callbackUrl: '/' })
              }}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
