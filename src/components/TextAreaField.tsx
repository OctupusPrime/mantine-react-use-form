import { Textarea, type TextareaProps } from "@mantine/core";
import clsx from "clsx";
import { useState } from "react";

interface TextAreaFieldProps {
  value: string;
  error?: string;
}

type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

export default function TextAreaField(
  props: MergeTypes<TextareaProps, TextAreaFieldProps>
) {
  const { value, error, ...other } = props;
  const [focused, setFocused] = useState(false);

  return (
    <Textarea
      placeholder="Autosize with no rows limit"
      label="Autosize with no rows limit"
      autosize
      minRows={1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      classNames={{
        root: "relative mt-6",
        label: clsx(
          "absolute z-10 top-[15px] left-3 pointer-events-none transition-all font-medium bg-white px-1.5",
          value.trim().length !== 0 || focused
            ? "-translate-y-7 text-sm"
            : "text-base"
        ),
        required: clsx(
          "transition-opacity",
          value.trim().length !== 0 || focused ? "opacity-100" : "opacity-0"
        ),
        input: clsx(
          "text-base px-4 py-[15px] h-auto rounded-lg placeholder:transition-color",
          !(value.trim().length !== 0 || focused)
            ? "placeholder:text-transparent"
            : "",
          error
            ? "border-red-400 focus-within:border-red-400"
            : "border-blue-400 focus-within:border-blue-400",
          "focus-within:border-2 focus-within:px-[15px] focus-within:py-[14px]"
        ),
      }}
      {...other}
    />
  );
}
