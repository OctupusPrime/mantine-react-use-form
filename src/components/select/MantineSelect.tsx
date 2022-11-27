import { Select, type SelectProps, Skeleton } from "@mantine/core";
import clsx from "clsx";
import { forwardRef } from "react";

interface MantineSelectProps extends SelectProps {
  isError?: boolean;
  isLoading?: boolean;
}

const MantineSelect = forwardRef<any, MantineSelectProps>((props, ref) => {
  const {
    error,
    classNames,
    isLoading,
    isError = !!props.error,
    ...other
  } = props;

  if (isLoading) return <Skeleton height={56} radius="md" />;

  return (
    <Select
      {...other}
      ref={ref}
      classNames={{
        ...classNames,
        input: clsx(
          "text-base pl-4 pr-6 py-[15px] h-auto rounded-lg placeholder:transition-color",
          isError
            ? "border-red-400 focus-within:border-red-400"
            : "border-blue-400 focus-within:border-blue-400",
          "focus-within:border-2 focus-within:pl-[15px] focus-within:py-3.5",
          classNames?.input
        ),
      }}
      error={error}
    />
  );
});

export default MantineSelect;
