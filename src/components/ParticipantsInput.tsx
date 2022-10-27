import {
  CloseButton,
  MultiSelect,
  type MultiSelectValueProps,
  type MultiSelectProps,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { forwardRef, useMemo, useState } from "react";

import clsx from "clsx";

function Value({
  label,
  onRemove,
  classNames,
  isError = false,
  ...others
}: MultiSelectValueProps & { isError: boolean }) {
  return (
    <div
      {...others}
      className={clsx(
        "rounded-md flex gap-1 items-center py-1.5 px-1",
        isError ? "bg-red-400/30 text-red-500" : "bg-blue-400/30 text-blue-500"
      )}
    >
      <p className="pl-2 font-medium">{label}</p>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        className={clsx(isError ? "text-red-500" : "text-blue-500")}
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </div>
  );
}

interface ParticipantsInputProps {
  error?: any;
}

type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

type WithoutData = Omit<MultiSelectProps, "data">;

const ParticipantsInput = forwardRef<
  any,
  MergeTypes<WithoutData, ParticipantsInputProps>
>((props, ref) => {
  const { value, onChange, error, onBlur, ...other } = props;

  const [searchValue, onSearchChange] = useState("");

  const handleAdd = () => {
    const newOption = searchValue.trim();

    if (!newOption) return;

    onChange?.([...new Set([...(value || []), newOption])]);
    onSearchChange("");
  };

  const handleClear = () => {
    onChange?.([]);
    onSearchChange("");
  };

  const errMsg = useMemo<string | null | undefined>(() => {
    if (error instanceof Array) {
      if (!error?.length) return null;

      const firstErrIndex = error.findIndex((val: any) => !!val);
      return value?.[firstErrIndex]
        ? `${value?.[firstErrIndex]} is not valid email`
        : null;
    }
    return error;
  }, [error]);

  return (
    <MultiSelect
      {...other}
      ref={ref}
      data={value || []}
      value={value}
      onChange={onChange}
      searchable
      clearable
      valueComponent={(props) => {
        const itemIndex = value?.findIndex((el) => props.value === el) ?? -1;
        return <Value {...props} isError={error?.[itemIndex]} />;
      }}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onKeyDown={getHotkeyHandler([
        ["Enter", handleAdd],
        ["Space", handleAdd],
      ])}
      onBlur={(el) => {
        onBlur?.(el);
        handleAdd();
      }}
      classNames={{
        values: "flex flex-wrap gap-2 -ml-2 min-h-[34px]",
        input: clsx(
          "rounded-lg p-2.5 px-4 pr-7 focus-within:pr-7 focus-within:border-2 focus-within:p-[9px] focus-within:px-[15px]",
          errMsg
            ? "border-red-400 focus-within:border-red-400"
            : "border-blue-400 focus-within:border-blue-400"
        ),
      }}
      error={errMsg}
      rightSection={
        (value?.length || searchValue) && (
          <CloseButton size={28} iconSize={16} onClick={handleClear} />
        )
      }
      rightSectionWidth={40}
    />
  );
});

export default ParticipantsInput;
