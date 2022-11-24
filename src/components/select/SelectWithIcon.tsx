import { type SelectItem, type SelectProps } from "@mantine/core";
import { forwardRef } from "react";
import MantineSelect from "./MantineSelect";

interface Item extends SelectItem {
  icon: number;
  label: string;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div">, Item {}

const SelectItemComp = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { label, icon, ...others } = props;

  return (
    <div ref={ref} {...others}>
      <div className="h-[30px] w-[30px] bg-black shrink-0" />
      <p>{label}</p>
    </div>
  );
});

interface SelectWithIconProps extends SelectProps {
  isLoading?: boolean;
  item?: Item;
}

const SelectWithIcon = forwardRef<any, SelectWithIconProps>((props, ref) => {
  const { item, ...other } = props;

  return (
    <MantineSelect
      {...other}
      ref={ref}
      maxDropdownHeight={400}
      itemComponent={SelectItemComp}
      classNames={{
        input: "pl-[55px] focus-within:pl-[54px] pr-7 focus-within:pr-7",
        icon: "ml-3",
        item: "flex items-center gap-2 p-2",
      }}
      styles={{
        item: {
          "&[data-selected]": {
            "&, &:hover": {
              backgroundColor: "#407BFF",
            },
            "&, p": {
              color: "white",
            },
          },
        },
      }}
      icon={item && <div className="h-[30px] w-[30px] bg-black" />}
    />
  );
});

export default SelectWithIcon;
