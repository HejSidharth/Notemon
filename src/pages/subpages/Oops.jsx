import React from 'react'
import { Link } from 'react-router-dom';

export default function Oops() {
  return (
<section class="bg-base-100">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
              Oops...
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
              You don't have access to this file
            </p>
            <p class="mb-4 text-lg font-light">
              Maybe you have the wrong link, or you aren't as close as you
              thought?{" "}
            </p>
            <Link to="/dashboard">
              <button className="btn">Go Back to Dashboard</button>
            </Link>
          </div>
        </div>
      </section>  
      )
}
