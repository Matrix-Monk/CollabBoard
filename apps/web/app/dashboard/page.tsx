import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      Welcome to the Whiteboard App!
      <div>
        <Link href="/canvas/1">Go to Canvas</Link>
      </div>
    </div>
  );
}

export default page
