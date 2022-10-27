import { type SelectItem, type SelectProps } from "@mantine/core";
import { forwardRef } from "react";
import MantineSelect from "./MantineSelect";

interface LocationItem extends SelectItem {
  type: number;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  type: number;
  label: string;
}

const SelectItemComp = forwardRef<HTMLDivElement, ItemProps>(
  ({ type, label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <p>{type}</p>
      <p>{label}</p>
    </div>
  )
);

interface LocationSelectProps extends SelectProps {
  item?: LocationItem;
}

const LocationSelect = forwardRef<any, LocationSelectProps>((props, ref) => {
  const { item, ...other } = props;

  return (
    <MantineSelect
      {...other}
      ref={ref}
      itemComponent={SelectItemComp}
      classNames={{
        input: "pl-[55px] focus-within:pl-[54px]",
        icon: "ml-3",
      }}
      icon={item && <div className="h-[30px] w-[30px] bg-black"></div>}
    />
  );
});

export default LocationSelect;
