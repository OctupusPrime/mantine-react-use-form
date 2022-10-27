import { Menu, Checkbox } from "@mantine/core";
import { useState } from "react";

const initialSelected = [false, false, false, false, false, false, false];

const weekDaysArr = [
  {
    title: "Monday",
    value: 1,
  },
  {
    title: "Tuesday",
    value: 2,
  },
  {
    title: "Wednesday",
    value: 3,
  },
  {
    title: "Thursday",
    value: 4,
  },
  {
    title: "Friday",
    value: 5,
  },
  {
    title: "Saturday",
    value: 6,
  },
  {
    title: "Sunday",
    value: 0,
  },
];

interface CopyTimeMenuProps {
  currentDate: number;
  onSubmit: (dates: number[]) => void;
}

const CopyTimeMenu = (props: CopyTimeMenuProps) => {
  const { currentDate, onSubmit } = props;

  const [selectedDates, setSelectedDates] =
    useState<boolean[]>(initialSelected);

  const handleCheckBox = (date: number) => {
    const selectArr = [...selectedDates];

    selectArr[date] = !selectArr[date];

    setSelectedDates([...selectArr]);
  };

  const handleSubmit = () => {
    const resArr: number[] = [];

    selectedDates.forEach((el, index) => {
      if (el) resArr.push(index);
    });

    onSubmit(resArr);
  };

  const handleClose = () => {
    setSelectedDates(initialSelected);
  };

  return (
    <>
      <Menu
        shadow="sm"
        width={250}
        position="top-end"
        classNames={{
          label: "text-sm p-4",
          dropdown: "p-0",
          item: "p-0 border-b border-gray-200",
        }}
        onClose={handleClose}
      >
        <Menu.Target>
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6666 8.60004V11.4C10.6666 13.7334 9.73325 14.6667 7.39992 14.6667H4.59992C2.26659 14.6667 1.33325 13.7334 1.33325 11.4V8.60004C1.33325 6.26671 2.26659 5.33337 4.59992 5.33337H7.39992C9.73325 5.33337 10.6666 6.26671 10.6666 8.60004Z"
              fill="#0AA2E3"
            />
            <path
              d="M11.4001 1.33337H8.60009C6.30009 1.33337 5.36675 2.24671 5.34009 4.50004H7.40009C10.2001 4.50004 11.5001 5.80004 11.5001 8.60004V10.66C13.7534 10.6334 14.6668 9.70004 14.6668 7.40004V4.60004C14.6668 2.26671 13.7334 1.33337 11.4001 1.33337Z"
              fill="#0AA2E3"
            />
          </svg>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Copy item to</Menu.Label>
          {weekDaysArr.map((el) => (
            <Menu.Item key={el.title} component="div" closeMenuOnClick={false}>
              <div className="border-b border-gray-400 px-4 py-1">
                <Checkbox
                  label={el.title}
                  labelPosition="left"
                  checked={selectedDates[el.value] || currentDate === el.value}
                  disabled={currentDate === el.value}
                  onChange={() => handleCheckBox(el.value)}
                  classNames={{
                    body: "w-full items-center",
                    labelWrapper: "flex-1",
                    label: "inline-block w-full p-2 font-semibold uppercase",
                  }}
                />
              </div>
            </Menu.Item>
          ))}

          <Menu.Item onClick={handleSubmit}>
            <p className="bg-blue-500 text-white rounded-md m-4 font-semibold text-center text-base py-2">
              Apply
            </p>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CopyTimeMenu;
