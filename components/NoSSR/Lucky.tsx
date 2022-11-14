import React from "react";
import {
  Stack,
  Title,
  MultiSelect,
  Group,
  Button,
  MultiSelectProps,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import Item from "../Item";
import Value from "../Value";
import { days, activities } from "../../consts";

const Lucky = (props: Partial<MultiSelectProps>) => {
  const router = useRouter();

  const prevEntries = window.localStorage.getItem("boy");

  const form = useForm({
    initialValues: prevEntries ? JSON.parse(prevEntries) : {},
  });

  const handleUpdate = (values: typeof form.values) => {
    window.localStorage.setItem("boy", JSON.stringify(values));
    window.localStorage.setItem("last-boy-update", new Date().toISOString());
  };

  const handleCompare = () => {
    router.push("/compare");
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Stack align="center" spacing={50} p={20}>
        <Title color="blue" align="center">
          WHAT ARE YOU AVAILABLE FOR?
        </Title>
        {days.map((day) => (
          <MultiSelect
            sx={{
              width: 300,
            }}
            key={day}
            data={activities}
            limit={20}
            valueComponent={Value}
            itemComponent={Item}
            searchable
            placeholder="Pick activities ..."
            label={day}
            {...form.getInputProps(day)}
            {...props}
          />
        ))}
        <Group>
          <Button type="submit">Update</Button>
          <Button onClick={handleCompare} variant="light">
            Compare
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
export default Lucky;
