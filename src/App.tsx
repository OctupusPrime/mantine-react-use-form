import ParticipantsInput from "./components/inputs/ParticipantsInput";
import TimeRangeSlider from "./components/sliders/TimeRangeSlider";

import { z } from "zod";
import { type SubmitHandler, FormProvider, Controller } from "react-hook-form";
import { Tooltip } from "@mantine/core";
import LocationSelect from "./components/select/LocationSelect";
import useDynamicForm from "./hooks/useDynamicForm";
import CopyTimeMenu from "./components/menus/CopyTimeMenu";
import TimeSlider from "./components/sliders/TimeSlider";
import TextField from "./components/inputs/TextField";
import TextAreaField from "./components/inputs/TextAreaField";
import MantineSelect from "./components/select/MantineSelect";

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
  locationValue: z.any(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

//title => label
//renderId => value
const locationData = [
  {
    type: 1,
    label: "Google",
    value: "google",
  },
  {
    type: 2,
    label: "Microsoft",
    value: "microsoft",
  },
  {
    type: 5,
    label: "Link",
    value: "link",
  },
  {
    type: 6,
    label: "Adress",
    value: "adress",
  },
  {
    type: 7,
    label: "Phone",
    value: "phone",
  },
];

const timeSelect = [
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
];

function App() {
  const [form, addFields, removeFields] = useDynamicForm<FormSchemaType>(
    FormSchema,
    {
      defaultValues: {
        title: "wqe",
        select: 10,
        users: ["ewq@reqw.ewq"],
      },
    }
  );

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const submitHandler: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  const handleShemaChange = (type: number) => {
    switch (type) {
      case 5:
        addFields(
          z.object({
            locationValue: z.string().regex(/^.{3,}$/, {
              message: "Please enter a valid link",
            }),
          })
        );
        return;
      case 6:
        addFields(
          z.object({
            locationValue: z.string().regex(/^.{3,}$/, {
              message: "Please enter a valid address",
            }),
          })
        );
        return;
      case 7:
        addFields(
          z.object({
            locationValue: z.string().regex(/^[0-9]+$/, {
              message: "Please enter a valid phone number",
            }),
          })
        );
        return;
      default:
        removeFields({
          locationValue: true,
        });
    }
  };

  const getLocationInputProps = (type: number) => {
    switch (type) {
      case 5:
        return {
          placeholder: "Paste link here",
          label: "Link",
        };
      case 6:
        return {
          placeholder: "Type here",
          label: "Address",
        };
      case 7:
        return {
          placeholder: "404-651-4212",
          label: "Phone Number",
        };
    }

    return null;
  };

  const locationVal = watch("location", undefined);

  return (
    <div className="max-w-md mx-auto pt-2 px-2">
      <div className="flex justify-between">
        <p>ewq</p>
        <CopyTimeMenu currentDate={2} onSubmit={(val) => console.log(val)} />
      </div>

      <TimeRangeSlider onChange={(range) => console.log("range", range)} />
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
                {...field}
                data={timeSelect}
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
            render={({ field: { value, onChange, ...other } }) => (
              <LocationSelect
                {...other}
                // isLoading={true}
                item={value}
                data={locationData}
                value={value?.value}
                onChange={(val) => {
                  const item = locationData.find((el) => el.value === val);

                  if (!item) return;
                  handleShemaChange(item.type);
                  onChange(item);
                }}
              />
            )}
          />
          {getLocationInputProps(locationVal?.type) && (
            <TextAreaField
              {...register("locationValue")}
              watchName="locationValue"
              error={errors?.locationValue?.message as string}
              {...getLocationInputProps(locationVal.type)}
            />
          )}

          <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
