import Bundle from "./pages/Bundle"
import GetIHS from "./pages/GetIHS"
import GetPraktisioner from "./pages/GetPractioner"
import GetToken from "./pages/GetToken"
import Location from "./pages/Location"
import PostLocation from "./pages/PostLocation"


function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline border-2">
        Coba Satu Sehat 2023
      </h1>
      <GetToken />
      <GetIHS />
      <GetPraktisioner />
      <Location />
      <PostLocation />
      <Bundle />
    </>
  )
}

export default App
