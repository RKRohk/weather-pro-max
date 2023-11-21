import { Suspense } from "react"
import Weather from "./weather"
import { redirect } from "next/navigation"

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const zipCode = searchParams?.zipCode
  const countryCode = searchParams?.countryCode

  if (zipCode && countryCode && typeof zipCode === 'string' && typeof countryCode === 'string') {
    return <Suspense>
      <Weather zipCode={zipCode} countryCode={countryCode} />
    </Suspense>
  }

  async function action(formData: FormData) {
    "use server"

    const zipCode = formData.get('zipCode')
    const countryCode = formData.get('countryCode')
    if (zipCode && countryCode && typeof zipCode === 'string' && typeof countryCode === 'string') {
      redirect(`/?zipCode=${zipCode}&countryCode=${countryCode}`)
    }
  }

  return (
    <main className='h-screen w-screen flex items-center flex-col  bg-white text-black'>
      <h2>Weather web</h2>
      <p>Created by Rohan</p>

      <form className="w-1/4 flex flex-col items-center gap-y-5 p-5 border rounded shadow" action={action}>
        <p>Enter zip code and country code to get weather</p>
        <input className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" type="text" name="zipCode" placeholder="Zip code" aria-autocomplete="list" accept="number" />
        <input className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" type="text" name="countryCode" placeholder="Country code" maxLength={2} />
        <button className="border w-3/4 items-center text-center bg-purple-100 rounded my-5" type="submit">Submit</button>
      </form>
    </main>
  )
}
