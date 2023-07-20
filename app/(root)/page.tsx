"use client";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Redo2,Undo2,X } from "lucide-react";


export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <div className="container mx-auto flex gap-8">
        <form
          className="flex flex-col gap-2 w-1/2"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <Label htmlFor="prompt">Prompt (Put your thought)</Label>
          <Input id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span>This field is required</span>}

          <Label className="mt-4">Canvas (Put your imagination)</Label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: 480, height: 480 }}
            strokeWidth={4}
            strokeColor="black"
          />

          <div className="flex justify-center items-center">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {

                canvasRef.current?.undo()
              }}
            >
              Undo <Undo2 size={18} />
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {

                canvasRef.current?.undo()
              }}
            >
              Redo <Redo2 size={18} />
            </Button>
          
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {
                canvasRef.current?.clearCanvas();

              }}
            >
              Clear <X size={18} />
            </Button>
          </div>

          <Button type="submit">Submit</Button>
        </form>

        <section>
          <h2>Recent Sketches</h2>
          <div className="grid grid-cols-4 gap-4">
            {sortedSketches.map((sketch) => (
              <img
                key={sketch._id}
                width="256"
                height="256"
                src={sketch.result}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}