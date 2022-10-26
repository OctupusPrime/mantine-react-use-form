import { type SelectItem, type SelectProps } from "@mantine/core";
import { forwardRef } from "react";
import MantineSelect from "./MantineSelect";

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
  item?: ItemProps;
}

const LocationSelect = (props: LocationSelectProps) => {
  const { item, ...other } = props;

  return (
    <MantineSelect
      {...other}
      itemComponent={SelectItemComp}
      classNames={{
        input: "pl-[55px] focus-within:pl-[54px]",
        icon: "ml-3",
      }}
      icon={
        item ? <div className="h-[30px] w-[30px] bg-black"></div> : undefined
      }
    />
  );
};

export default LocationSelect;
