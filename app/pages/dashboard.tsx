import { Suspense } from "react"
import { BlitzPage } from "@blitzjs/core"
import { Link, useMutation } from "blitz"
import logout from "../auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"

const Dashboard: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      {currentUser ? (
        <>
          <h1>Ciao {currentUser.name}, Bentornato sulla tua Dashboard</h1>
          <button
            className="button small"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>Pagina Protetta</h1>
          <Link href="/">
            <a className="button small">
              <strong>Effettua il Login</strong>
            </a>
          </Link>
        </>
      )}
      <style jsx global>
        {`
          .button {
            font-size: 1rem;
            background-color: #6700eb;
            padding: 1rem 2rem;
            color: #f4f4f4;
            text-align: center;
          }

          .button.small {
            padding: 0.5rem 1rem;
          }

          .button:hover {
            background-color: #45009d;
          }
        `}
      </style>
    </>
  )
}

const DashboardWithSuspense = () => {
  return (
    <Suspense fallback="Loading...">
      <Dashboard />
    </Suspense>
  )
}

export default DashboardWithSuspense
