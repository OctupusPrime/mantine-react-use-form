import { type SelectProps } from "@mantine/core";
import { forwardRef } from "react";
import MantineSelect from "./MantineSelect";

type Item = {
  name: string;
  members: any[];
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div">, Item {}

const SelectItemComp = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { name, members, ...others } = props;

  const membersLgth = members?.length > 1 ? members?.length : null;

  return (
    <div ref={ref} {...others}>
      <p className="text-base">{name}</p>
      {membersLgth ? (
        <p className="text-sm font-medium text-gray-400">
          {membersLgth} members
        </p>
      ) : null}
    </div>
  );
});

interface LocationSelectProps extends SelectProps {
  isLoading?: boolean;
  item?: Item;
}

const TeamSelect = forwardRef<any, LocationSelectProps>((props, ref) => {
  const { item, ...other } = props;

  const membersLgth =
    item?.members && item?.members?.length > 1 ? item?.members?.length : null;

  return (
    <>
      <MantineSelect
        {...other}
        ref={ref}
        itemComponent={SelectItemComp}
        classNames={{
          root: "relative",
          input: membersLgth
            ? "pt-1.5 pb-6 focus-within:pt-[5px] focus-within:pb-[23px]"
            : "",
        }}
        styles={{
          item: {
            "&[data-selected]": {
              "&, &:hover": {
                backgroundColor: "#407BFF",
              },
              "&, p": {
                color: "white",
              },
            },
          },
        }}
        inputContainer={(input) => (
          <>
            {input}
            {membersLgth ? (
              <p className="absolute bottom-[7px] left-4 text-sm text-gray-400 font-medium">
                {membersLgth} members
              </p>
            ) : null}
          </>
        )}
      />
    </>
  );
});

TeamSelect.displayName = "TeamSelect";

export default TeamSelect;
