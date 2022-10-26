import { useEffect, useState } from "react";

import ParticipantsInput from "./components/ParticipantsInput";
import TextAreaField from "./components/TextAreaField";
import TextField from "./components/TextField";
import TimeRangeSlider from "./components/TimeRangeSlider";
import TimeSlider from "./components/TimeSlider";

import { z } from "zod";
import {
  type SubmitHandler,
  useForm,
  FormProvider,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MantineSelect from "./components/MantineSelect";

const isEmailCheck =
  /^([a-zA-Z0-9]{1,}[\w\.\+\-]*)@([a-zA-Z0-9]{1,}[a-zA-Z0-9\-]*)\.([a-zA-Z]{2,6})$/;

const FormSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  select: z.string(),
  users: z.array(z.string().regex(isEmailCheck)),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function App() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "wqe",
    },
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;

  const submitHandler: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto pt-2 px-2">
      {/* <ParticipantsInput value={emails} onChange={setEmails} /> */}
      <TimeRangeSlider onChange={(range) => console.log("range", range)} />
      <TimeSlider onChange={(time) => console.log("time", time)} />
      {/* <TextField value="" />
      <TextAreaField value="" /> */}
      {/* <MantineSelect data={["ewq", "ewq2"]} /> */}

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-4">
          <p>React form test</p>
          <TextField
            label="Title"
            watchName="title"
            {...register("title")}
            error={errors?.title?.message}
          />

          <Controller
            name="select"
            control={control}
            render={({ field: options }) => (
              <MantineSelect
                data={["test1", "test2", "test3"]}
                {...options}
                error={errors?.select?.message}
              />
            )}
          />

          <Controller
            name="users"
            control={control}
            render={({ field: options }) => (
              <ParticipantsInput
                {...options}
                error={errors?.users?.message}
                errorArr={errors?.users as Array<any>}
              />
            )}
          />

          <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
