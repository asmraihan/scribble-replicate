"use client"

import { useQuery } from "convex/react"




export default function Home() {

  const saveSketchMutation = useQuery<any>("sketches:getSketches")

  return (
    <div className="p-4">
      {
        saveSketchMutation?.map(sketch => <div key={sketch._id}>
             {sketch.prompt} 
             </div>)
      }
    </div>
  )
}
