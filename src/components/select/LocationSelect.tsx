import { type SelectItem, type SelectProps } from "@mantine/core";
import { forwardRef } from "react";
import MantineSelect from "./MantineSelect";

interface LocationItem extends SelectItem {
  email?: string;
  location?: string;
  type: number;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  type: number;
  label: string;
}

const SelectItemComp = forwardRef<HTMLDivElement, ItemProps>(
  ({ type, label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <div className="h-[30px] w-[30px] bg-black shrink-0" />
      <p className="truncate">{label}</p>
    </div>
  )
);

interface LocationSelectProps extends SelectProps {
  isLoading?: boolean;
  item?: LocationItem;
}

const LocationSelect = forwardRef<any, LocationSelectProps>((props, ref) => {
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
              backgroundColor: "rgb(191 219 254)",
              color: "black",
            },
          },
        },
      }}
      icon={item && <div className="h-[30px] w-[30px] bg-black" />}
    />
  );
});

export default LocationSelect;
