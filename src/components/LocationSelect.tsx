import { type SelectItem, type SelectProps } from "@mantine/core";
import { forwardRef } from "react";
import MantineSelect from "./MantineSelect";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  type: number;
  label: string;
}

const SelectItemComp = forwardRef<HTMLDivElement, ItemProps>(
  ({ type, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <p>{type}</p>
      <p>{label}</p>
    </div>
  )
);

const LocationSelect = forwardRef<any, SelectProps>((props, ref) => {
  return (
    <MantineSelect
      {...props}
      itemComponent={SelectItemComp}
      classNames={{
        input: "pl-[55px] focus-within:pl-[54px]",
      }}
    />
  );
});

export default LocationSelect;
