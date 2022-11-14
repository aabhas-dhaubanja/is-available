import React from "react";
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
import { isThisWeek } from "date-fns";

const Root = (props: Partial<MultiSelectProps>) => {
  const router = useRouter();

  const form = useForm();

  const mantain = async () => {
    const boy = await fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ key: "last-girl-update" }),
    }).then((response) => response.json());

    const girl = await fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ key: "last-girl-update" }),
    }).then((response) => response.json());

    const lastBoyUpdate = JSON.parse(boy.value);
    const lastGirlUpdate = JSON.parse(girl.value);

    if (lastGirlUpdate && !isThisWeek(new Date(lastGirlUpdate))) {
      fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({ key: "girl", value: JSON.stringify({}) }),
      });
      fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({
          key: "last-girl-update",
          value: new Date().toISOString(),
        }),
      });
    }

    if (lastBoyUpdate && !isThisWeek(new Date(lastBoyUpdate))) {
      fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({ key: "boy", value: JSON.stringify({}) }),
      });
      fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({
          key: "last-boy-update",
          value: new Date().toISOString(),
        }),
      });
    }
  };

  React.useEffect(() => {
    mantain();
  }, []);

  React.useEffect(() => {
    fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ key: "girl" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const prevEntries = JSON.parse(data.value);
        const obj = JSON.parse(prevEntries);
        form.setValues(obj);
      });
  }, []);

  const handleUpdate = (values: typeof form.values) => {
    fetch("/api/set", {
      method: "POST",
      body: JSON.stringify({ key: "girl", value: JSON.stringify(values) }),
    });
    fetch("/api/set", {
      method: "POST",
      body: JSON.stringify({
        key: "last-girl-update",
        value: new Date().toISOString(),
      }),
    });
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
