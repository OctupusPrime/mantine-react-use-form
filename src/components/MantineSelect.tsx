import { Select, type SelectProps } from "@mantine/core";
import clsx from "clsx";
import { forwardRef } from "react";

const MantineSelect = forwardRef<any, SelectProps>((props, ref) => {
  const { error, ...other } = props;

  return (
    <Select
      {...other}
      ref={ref}
      classNames={{
        input: clsx(
          "text-base px-4 py-[15px] h-auto rounded-lg placeholder:transition-color",
          error
            ? "border-red-400 focus-within:border-red-400"
            : "border-blue-400 focus-within:border-blue-400",
          "focus-within:border-2 focus-within:px-[15px] focus-within:py-[14px]"
        ),
      }}
      error={error}
    />
  );
});

export default MantineSelect;
