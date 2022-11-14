import {
  Stack,
  Title,
  MultiSelect,
  Group,
  Button,
  MultiSelectProps,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import Item from "../Item";
import Value from "../Value";
import { days, activities } from "../../consts";

const Root = (props: Partial<MultiSelectProps>) => {
  const router = useRouter();

  const prevEntries = window.localStorage.getItem("girl");

  const form = useForm({
    initialValues: prevEntries ? JSON.parse(prevEntries) : {},
  });

  const handleUpdate = (values: typeof form.values) => {
    window.localStorage.setItem("girl", JSON.stringify(values));
    window.localStorage.setItem("last-girl-update", new Date().toISOString());
  };

  const handleCompare = () => {
    router.push("/compare");
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Stack align="center" spacing={50} p={20}>
        <Box
          onClick={() => router.push("/lucky")}
          sx={(theme) => ({
            width: 30,
            height: 30,
            background: theme.colors.pink[6],
            position: "absolute",
            left: -15,
            top: -15,
            borderRadius: 30,
          })}
        />
        <Title align="center">WHAT ARE YOU AVAILABLE FOR?</Title>
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
          <Button color="pink" type="submit">
            Update
          </Button>
          <Button onClick={handleCompare} color="pink" variant="light">
            Compare
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Root;
