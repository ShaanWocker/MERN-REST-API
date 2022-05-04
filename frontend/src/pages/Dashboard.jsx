import { useSelector } from 'react-redux';
import Chat from '../components/Chat'

function Dashboard(props) {


  const { user } = useSelector((state) => state.auth)


  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
      <section>
      {user ? <Chat /> : null}
       </section>
    </>
  )
}

export default Dashboard