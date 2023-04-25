import { Counter } from "./Counter"

export const Page = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>This page is server-rendered with vite-plugin-ssr!</p>
      <p>
        This counter is even hydrated! <Counter />
      </p>
    </>
  )
}
