"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

type Inputs = {
  prompt: string
  exampleRequired: string

}
export default function Home() {
  const [sketchId, setSketchId] = useState<string>("")
  const saveSketchMutation = useMutation<any>("sketches:saveSketch")
  //@ts-ignore
  const sketchQuery = useQuery("sketches:getSketch", {
    sketchId,
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  return (
    <div className="p-4 grid grid-cols-2">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(async (formData) => {
          if (!canvasRef.current) return
          const image = await canvasRef.current?.exportImage("jpeg")
          const results = await saveSketchMutation({ ...formData, image })
          setSketchId(results.id)

        })}>
        <Label htmlFor="prompt">Put your thoughts</Label>
        <Input id="prompt"  {...register("prompt", { required: true })} />
        {errors.prompt && <span>This field is required</span>}
        <Label htmlFor="canvas">Put your imagination</Label>
        <ReactSketchCanvas
          ref={canvasRef}
          style={{ width: 480, height: 480 }}
          strokeWidth={4}
          strokeColor="black"
        />

        <Button type="submit">Process</Button>
      </form>
      {sketchQuery &&
        <img width="256" height="256" src={sketchQuery.result} />
      }
    </div>
  )
}
