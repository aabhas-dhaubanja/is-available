import React from "react";
import { Title, Stack, Group } from "@mantine/core";
import { days, flags } from "../../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceKissWinkHeart } from "@fortawesome/free-solid-svg-icons";

const Compare = () => {
  const girl = window.localStorage.getItem("girl");
  const boy = window.localStorage.getItem("boy");

  const girlActivities = girl ? JSON.parse(girl) : {};
  const boyActivities = boy ? JSON.parse(boy) : {};

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
          <Stack key={day}>
            <Title order={4}>{day}</Title>
            <Group position="center" noWrap>
              {commonActivities.map((activity) => {
                const Flag = flags[activity];
                return <Flag color="green" key={activity} />;
              })}
            </Group>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Compare;
