import Bundle from "./pages/Bundle"
import GetIHS from "./pages/GetIHS"
import GetToken from "./pages/GetToken"
import Location from "./pages/Location"
import Parameter from "./pages/Parameter"
import PostLocation from "./pages/PostLocation"


function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline border-2">
        Coba Satset 2023
      </h1>
      <Parameter />
      <GetToken />
      <GetIHS />
      <Location />
      <PostLocation />
      <Bundle />
    </>
  )
}

export default App
