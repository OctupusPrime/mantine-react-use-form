import { Select, type SelectProps, Skeleton } from "@mantine/core";
import clsx from "clsx";
import { forwardRef } from "react";

interface MantineSelectProps extends SelectProps {
  isLoading?: boolean;
}

const MantineSelect = forwardRef<any, MantineSelectProps>((props, ref) => {
  const { error, classNames, isLoading, ...other } = props;

  if (isLoading) return <Skeleton height={56} radius="md" />;

  return (
    <Select
      {...other}
      ref={ref}
      classNames={{
        ...classNames,
        input: clsx(
          "text-base px-4 py-[15px] h-auto rounded-lg placeholder:transition-color",
          error
            ? "border-red-400 focus-within:border-red-400"
            : "border-blue-400 focus-within:border-blue-400",
          "focus-within:border-2 focus-within:px-[15px] focus-within:py-[14px]",
          classNames?.input
        ),
      }}
      error={error}
    />
  );
});

export default MantineSelect;