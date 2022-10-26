import { Tooltip, type TooltipProps } from "@mantine/core";
import { ReactNode } from "react";

interface MantineTooltipProps extends TooltipProps {
  children: ReactNode;
}

const MantineTooltip = (props: MantineTooltipProps) => {
  const { children, ...other } = props;

  return (
    <Tooltip
      {...other}
      width={280}
      color="blue"
      withArrow
      multiline
      classNames={{
        tooltip: "text-center",
      }}
    >
      {children}
    </Tooltip>
  );
};

export default MantineTooltip;
