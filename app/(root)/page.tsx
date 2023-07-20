"use client"

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  prompt: string
  exampleRequired: string
  
}
export default function Home() {

  const saveSketchMutation = useMutation<any>("sketches:saveSketch")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()


  return (
    <div className="p-4">
      <form onSubmit={handleSubmit( async(formData) => {
        const result = await saveSketchMutation(formData)
        console.log(result)

      })}>
        <input className=" border-black border-2" {...register("prompt", { required: true })} />
        {errors.prompt && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  )
}
