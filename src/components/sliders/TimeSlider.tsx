import { Slider } from "@mantine/core";
import dayjs from "dayjs";

interface TimeSliderProps {
  defaultValue?: number;
  onChange: (time: number) => void;
}

export default function TimeSlider(props: TimeSliderProps) {
  const { defaultValue, onChange } = props;

  return (
    <Slider
      min={0}
      max={24}
      defaultValue={defaultValue ?? 7}
      labelAlwaysOn
      onChangeEnd={onChange}
      label={(value: number) => dayjs().hour(value).format("h A")}
      classNames={{
        track: "h-[5px]",
        root: "mt-8",
        label: "bg-transparent text-black font-bold text-sm -top-8",
        thumb: "h-[20px] w-[20px] bg-blue-500 border-0",
      }}
    />
  );
}
