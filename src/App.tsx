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
import { Tooltip } from "@mantine/core";
import LocationSelect from "./components/LocationSelect";

const isEmailCheck =
  /^([a-zA-Z0-9]{1,}[\w\.\+\-]*)@([a-zA-Z0-9]{1,}[a-zA-Z0-9\-]*)\.([a-zA-Z]{2,6})$/;

const FormSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  select: z.number(),
  users: z.array(z.string().regex(isEmailCheck)),
  location: z.object({
    type: z.number(),
    label: z.string(),
    value: z.string(),
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const locationData = [
  {
    type: 1,
    label: "tewer",
    value: "test",
  },
  {
    type: 2,
    label: "tewerewq",
    value: "testw",
  },
];

function App() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "wqe",
      select: 10,
      users: ["ewq@reqw.ewq"],
    },
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValue("location", locationData[0]);
  //   }, 1000);
  // }, []);

  const submitHandler: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto pt-2 px-2">
      {/* <ParticipantsInput value={emails} onChange={setEmails} /> */}
      <TimeRangeSlider onChange={(range) => console.log("range", range)} />

      {/* <TextField value="" />
      <TextAreaField value="" /> */}
      {/* <MantineSelect data={["ewq", "ewq2"]} /> */}
      <Tooltip label="Tooltip" color="blue" withArrow>
        <span>
          <TimeSlider onChange={(time) => console.log("time", time)} />
        </span>
      </Tooltip>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-4">
          <p>React form test</p>
          <TextField
            label="Title"
            watchName="title"
            {...register("title")}
            error={errors?.title?.message}
          />
          <TextAreaField
            label="Description"
            watchName="description"
            {...register("description")}
            error={errors?.description?.message}
          />

          <Controller
            name="select"
            control={control}
            render={({ field }) => (
              <MantineSelect
                data={[
                  {
                    value: "10",
                    label: "Test 1",
                  },
                  {
                    value: "20",
                    label: "Test 2",
                  },
                  {
                    value: "30",
                    label: "Test 3",
                  },
                ]}
                {...field}
                value={field.value + ""}
                onChange={(option) => option && field.onChange(+option)}
                error={errors?.select?.message}
              />
            )}
          />

          <Controller
            name="users"
            control={control}
            render={({ field }) => (
              <ParticipantsInput
                {...field}
                error={
                  errors?.users?.length ? errors.users : errors?.users?.message
                }
              />
            )}
          />

          <p>Location</p>
          <Controller
            name="location"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <div className="relative">
                <div className="absolute top-1/2 left-[15px] -translate-y-1/2 h-[30px] w-[30px] bg-black z-10"></div>
                <LocationSelect
                  data={locationData}
                  onBlur={onBlur}
                  value={value?.value}
                  onChange={(val) =>
                    onChange(locationData.find((el) => el.value === val))
                  }
                />
              </div>
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
