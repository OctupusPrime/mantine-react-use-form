import { forwardRef, useState } from "react";
import { TextInput, type TextInputProps } from "@mantine/core";
import { useWatch } from "react-hook-form";

import clsx from "clsx";

interface TextFieldProps extends TextInputProps {
  watchName?: string;
}

const TextField = forwardRef<any, TextFieldProps>((props, ref) => {
  const { watchName, error, onBlur, onFocus, ...other } = props;
  const [focused, setFocused] = useState(false);

  const value = watchName ? useWatch({ name: watchName }) : props.value;

  return (
    <TextInput
      {...other}
      classNames={{
        root: "relative mt-6",
        label: clsx(
          "absolute z-10 top-[15px] left-3 pointer-events-none transition-all font-medium bg-white px-1.5",
          value || focused ? "-translate-y-7 text-sm" : "text-base",
          error && "text-red-500"
        ),
        required: clsx(
          "transition-opacity",
          value || focused ? "opacity-100" : "opacity-0"
        ),
        input: clsx(
          "text-base px-4 py-[15px] h-auto rounded-lg placeholder:transition-color",
          !(value || focused) && "placeholder:text-transparent",
          error
            ? "border-red-400 focus-within:border-red-400"
            : "border-blue-400 focus-within:border-blue-400",
          "focus-within:border-2 focus-within:px-[15px] focus-within:py-[14px]"
        ),
      }}
      error={error}
      onFocus={(el) => {
        setFocused(true);
        onFocus?.(el);
      }}
      onBlur={(el) => {
        setFocused(false);
        onBlur?.(el);
      }}
      ref={ref}
      autoComplete="nope"
    />
  );
});

export default TextField;
