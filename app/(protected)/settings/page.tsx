import React from 'react'
import {auth, signOut} from "@/auth"
async function Settings() {
    const session = await auth()

    
  return (
 <div>
       <div>{JSON.stringify(session)}</div>

       <form action={async () => {
        "use server";

        await signOut()
       }}>
        <button type="submit" className="btn btn-">
            Sign out
        </button>
       </form>
 </div>
  )
}

export default Settings