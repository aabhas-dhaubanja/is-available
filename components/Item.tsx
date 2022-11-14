import { SelectItemProps, Box } from "@mantine/core";
import React from "react";
import { flags } from "../consts";

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, value, ...others }, ref) => {
    const Flag = value && flags[value];
    return (
      <div ref={ref} {...others}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box mr={10}>
            <Flag />
          </Box>
          <div>{label}</div>
        </Box>
      </div>
    );
  }
);

export default Item;

Item.displayName = "Item";
