"use client"

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

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

  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  return (
    <div className="p-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(async (formData) => {
          if (!canvasRef.current) return
          const image = await canvasRef.current?.exportImage("jpeg")
          const result = await saveSketchMutation({...formData, image})

        })}>
        <input className=" border-black border-2" {...register("prompt", { required: true })} />
        {errors.prompt && <span>This field is required</span>}
        <ReactSketchCanvas
          ref={canvasRef}
          style={{ width: 256, height: 256 }}
          strokeWidth={4}
          strokeColor="black"
        />
        <input className="bg-blue-400 rounded-md" type="submit" />
      </form>
    </div>
  )
}
