import { Menu, Checkbox, Button } from "@mantine/core";
import { useState } from "react";

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

const CopyTimeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      shadow="sm"
      width={250}
      position="top-end"
      classNames={{
        label: "text-sm p-4",
        dropdown: "p-0",
        item: "p-0 border-b border-gray-400",
      }}
    >
      <Menu.Target>
        <div className="flex">
          <p className="ml-auto">"Button"</p>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Copy item to</Menu.Label>
        {weekDaysArr.map((el) => (
          <Menu.Item key={el.title} component="div" closeMenuOnClick={false}>
            <div className="border-b border-gray-400 px-4 py-1">
              <Checkbox
                label={el.title}
                labelPosition="left"
                classNames={{
                  body: "w-full items-center",
                  labelWrapper: "flex-1",
                  label: "inline-block w-full p-2 font-semibold uppercase",
                }}
              />
            </div>
          </Menu.Item>
        ))}

        <Menu.Item onClick={() => console.log(1)}>
          <p className="bg-blue-500 text-white rounded-md m-4 font-semibold text-center text-lg py-2">
            Apply
          </p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CopyTimeMenu;
