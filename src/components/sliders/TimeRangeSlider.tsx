import { RangeSlider } from "@mantine/core";
import dayjs from "dayjs";

interface TimeRangeSliderProps {
  defaultValue?: [number, number];
  onChange: (range: [number, number]) => void;
}

export default function TimeRangeSlider(props: TimeRangeSliderProps) {
  const { defaultValue, onChange } = props;

  return (
    <RangeSlider
      min={0}
      max={24}
      minRange={1}
      labelAlwaysOn
      defaultValue={defaultValue || [7, 17]}
      onChangeEnd={onChange}
      label={(value: number) => dayjs().hour(value).format("h A")}
      classNames={{
        track: "h-[5px]",
        root: "mt-8",
        label: "bg-transparent text-black font-bold text-sm -top-8",
        thumb: "h-[20px] w-[20px] bg-blue-500 border-0",
      }}
      styles={{
        track: {
          "& > .mantine-Slider-thumb .mantine-Slider-label": {
            right: 0,
          },
          "& > .mantine-Slider-thumb ~ .mantine-Slider-thumb .mantine-Slider-label":
            {
              right: "auto",
              left: 0,
            },
        },
      }}
    />
  );
}
