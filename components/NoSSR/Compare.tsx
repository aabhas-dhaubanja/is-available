import React from "react";
import { Group, Text, Title, Stack } from "@mantine/core";
import { days, flags } from "../../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceKissWinkHeart } from "@fortawesome/free-solid-svg-icons";

const Compare = () => {
  const [girlActivities, setGirlActivities] = React.useState<any>({});
  const [boyActivities, setBoyActivities] = React.useState<any>({});

  React.useEffect(() => {
    fetch("/api/all?key=girl")
      .then((response) => response.json())
      .then((data) => {
        if (!data.value) return;
        const prevEntries = JSON.parse(data.value);
        setGirlActivities(prevEntries);
      });
    fetch("/api/all?key=boy")
      .then((response) => response.json())
      .then((data) => {
        if (!data.value) return;
        const prevEntries = JSON.parse(data.value);
        setBoyActivities(prevEntries);
      });
  }, []);

  return (
    <Stack align="center" spacing={50} p={20}>
      <Title align="center">
        YOU BOTH AGREED ON THE FOLLOWING ACTIVITIES{" "}
        <FontAwesomeIcon icon={faFaceKissWinkHeart} />
      </Title>
      {days.map((day) => {
        const commonActivities: Array<string> = [];
        const currentDayGirlActivities: Array<string> = girlActivities[day];
        const currentDayBoyActivities: Array<string> = boyActivities[day];

        if (currentDayGirlActivities && currentDayBoyActivities) {
          currentDayGirlActivities.forEach((girlActivity) => {
            currentDayBoyActivities.forEach((boyActivity) => {
              if (girlActivity == boyActivity)
                commonActivities.push(boyActivity);
            });
          });
        }

        return (
          <Stack align="center" key={day}>
            <Title order={4}>{day}</Title>
            <Group position="center">
              {commonActivities.map((activity) => {
                const Flag = flags[activity];
                return (
                  <Group position="center" spacing={0} key={activity} noWrap>
                    <Text>{activity}</Text>
                    <Text>(</Text>
                    <Flag color="green" />
                    <Text>)</Text>
                  </Group>
                );
              })}
            </Group>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Compare;
