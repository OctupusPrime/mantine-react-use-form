import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  useForm,
  type FieldValues,
  type UseFormReturn,
  type UseFormProps,
} from "react-hook-form";
import { z } from "zod";

export type FormPropsWithoutResolver = Omit<
  UseFormProps<FieldValues, any>,
  "resolver"
>;

type ZodShema = z.ZodObject<any>;

export default function useDynamicForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(
  defaultShema: ZodShema,
  props: UseFormProps<TFieldValues, TContext>
): [
  UseFormReturn<TFieldValues, TContext>,
  (newShema: ZodShema) => void,
  (removeKeys: Record<string, boolean>) => void
] {
  const [shema, setShema] = useState<ZodShema>(defaultShema);

  const form = useForm<TFieldValues>({
    ...props,
    resolver: zodResolver(shema),
  });

  const updateFields = (newShema: ZodShema) => {
    setShema((old) => old.merge(newShema));
  };

  const removeFields = (removeKeys: Record<string, boolean>) => {
    setShema((old) => old.omit(removeKeys as any));
  };

  return [form, updateFields, removeFields];
}
