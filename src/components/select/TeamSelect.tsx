import { type SelectProps } from "@mantine/core";
import { Children, forwardRef } from "react";
import MantineSelect from "./MantineSelect";

type TeamItem = {
  name: string;
  members: any[];
};

interface LocationSelectProps extends SelectProps {
  isLoading?: boolean;
  item?: TeamItem;
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
        classNames={{
          root: "relative",
          input: membersLgth
            ? "pt-[7px] pb-[23px] focus-within:pt-1.5 focus-within:pb-[22px]"
            : "",
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
