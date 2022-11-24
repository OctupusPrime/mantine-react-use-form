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
import TimePicker from "./components/select/TimePicker";
import TeamSelect from "./components/select/TeamSelect";
import { useMemo } from "react";

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
  team: z
    .object({
      name: z.string(),
      members: z.array(z.any()),
      id: z.number(),
    })
    .catchall(z.any()),
});

FormSchema.shape.title.min(5, { message: "test" });

type FormSchemaType = z.infer<typeof FormSchema>;

//title => label
//renderId => value
const locationData = [
  {
    type: 1,
    label: "Google ewqe wqewqeqwewq ewq ewqewqeqwe ewqwqewqe wq",
    value: "google",
    description: "test",
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

const teamSelectData = [
  {
    name: "Finance Team A",
    members: [1, 2, 3, 4],
    id: 1,
  },
  {
    name: "Just me",
    members: [1],
    id: 3,
  },
];

function App() {
  const [form, addFields, removeFields] = useDynamicForm<FormSchemaType>(
    FormSchema,
    {
      defaultValues: {
        title: "wqe",
        // select: 10,
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

  const parsedTeams = useMemo(() => {
    return teamSelectData.map((el: any) => {
      const { name, id, ...other } = el;

      return {
        label: name,
        value: id + "",
        name,
        id,
        ...other,
      };
    });
  }, []);

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
      {/* <div className="flex justify-between">
        <CopyTimeMenu currentDate={2} onSubmit={(val) => console.log(val)} />
      </div>

      <TimePicker /> */}

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
          <Controller
            name="team"
            control={control}
            render={({ field: { value, onChange, ...other } }) => (
              <TeamSelect
                {...other}
                // isLoading={true}
                item={value}
                data={parsedTeams}
                value={value?.value}
                onChange={(val) => {
                  const item = parsedTeams.find((el) => el.value === val);

                  if (!item) return;
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut maiores
        voluptatibus ex, assumenda pariatur repudiandae fuga obcaecati similique
        quia veniam, quos repellendus. Dolorem totam corporis corrupti ratione
        illo ipsa, odio inventore? Ab, rem assumenda impedit, aperiam distinctio
        laudantium similique dicta sit iste reprehenderit in iure libero cumque
        vitae ea dolore mollitia quisquam eum at. Aliquam vel sint, consectetur
        maxime inventore odio at! In, maiores! Error, repellendus saepe!
        Explicabo eveniet, aliquid eos totam doloremque minima quae molestias
        possimus dolorum ad quia voluptatem recusandae officiis vitae magni
        voluptates saepe sequi nesciunt accusamus maiores perspiciatis! Iste
        unde nesciunt obcaecati recusandae ipsam id error?
      </p>
      <CopyTimeMenu currentDate={2} onSubmit={(val) => console.log(val)} />
    </div>
  );
}

export default App;
