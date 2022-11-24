import dayjs from "dayjs";
import { useMemo, useState } from "react";
import MantineSelect from "./MantineSelect";

const TimePicker = () => {
  const getTimeList = useMemo(() => {
    const timesArr = [];
    for (let i = 1; i <= 23; i++) {
      const time = dayjs().startOf("day").hour(i);
      timesArr.push({
        value: String(time.hour()),
        label: time.format("hh:mm a"),
      });
    }
    timesArr.push({
      value: "0",
      label: "12:00 am",
    });
    return timesArr;
  }, []);

  const [selected, setSelected] = useState<number>();

  return (
    <>
      <div
        className="grid flex-1 justify-items-center gap-2"
        style={{ gridTemplateColumns: "1fr 20px 1fr" }}
      >
        <MantineSelect
          isError={true}
          data={getTimeList}
          value={String(selected)}
          onChange={(val) => val && setSelected(+val)}
        />
        <span className="py-3 text-lg">-</span>
      </div>
    </>
  );
};

export default TimePicker;
