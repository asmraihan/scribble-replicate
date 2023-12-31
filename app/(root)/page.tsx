"use client";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Redo2, Undo2, X } from "lucide-react";
import Image from "next/image";


export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    prompt: string;
  }>();

  console.log(isSubmitting)
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  // console.log(sortedSketches)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <div className="container mx-auto lg:flex gap-8 ">
        <form
          className="flex flex-col gap-2 w-2/6"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <Label htmlFor="prompt">Prompt (Put your thought)</Label>
          <Input id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span className="text-orange-500">This field is required</span>}

          <Label className="mt-4">Canvas (Put your imagination)</Label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: 400, height: 400 }}
            strokeWidth={4}
            strokeColor="black"
          // className="w-1/2"
          />

          <div className="flex justify-between items-center ">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {

                canvasRef.current?.undo()
              }}
            >
              Undo <Undo2 size={18} />
            </Button>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {

                canvasRef.current?.redo()
              }}
            >
              Redo <Redo2 size={18} />
            </Button>

            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                canvasRef.current?.clearCanvas();

              }}
            >
              Clear <X size={18} />
            </Button>
          </div>



          <Button disabled={isSubmitting} type="submit">
          
            Submit
          </Button>
        </form>

        <section className=" mt-10 lg:mt-0">
          <h2 className="mb-10">Recent Sketches</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 mx-auto gap-4">
            {sortedSketches.map((sketch) => (
              sketch.result && (
                <Image
                  key={sketch._id}
                  width="256"
                  height="256"
                  src={sketch.result}
                  loading="lazy"
                  alt={sketch.prompt}
                  className="rounded-sm transition-all duration-300 hover:-translate-y-2"
                />
              )
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}