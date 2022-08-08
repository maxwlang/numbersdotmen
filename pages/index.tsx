import type { NextPage } from 'next'
import Head from 'next/head'
import Characters from '../Components/Characters'

const Home: NextPage = () => {

  return (
    <div className="px-8 bg-slate-900 text-white">
      <Head>
        <title>93821498723149071238470128973819037451891019237401.men</title>
        <meta name="description" content="93821498723149071238470128973819037451891019237401.men" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 py-32 flex-col justify-center content-center min-h-screen">
        <h1 className="m-0 leading-10 text-6xl text-center break-all">
          <Characters />
        </h1>
      </main>
    </div>
  )
}

export default Home
