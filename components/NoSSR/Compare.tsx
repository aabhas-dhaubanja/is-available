import React from "react";
import { Title, Stack, Group } from "@mantine/core";
import { days, flags } from "../../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceKissWinkHeart } from "@fortawesome/free-solid-svg-icons";

const Compare = () => {
  const [girlActivities, setGirlActivities] = React.useState<any>({});
  const [boyActivities, setBoyActivities] = React.useState<any>({});

  React.useEffect(() => {
    fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ key: "girl" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.value) return;
        const prevEntries = JSON.parse(data.value);
        const obj = JSON.parse(prevEntries);
        console.log(obj);
        setGirlActivities(obj);
      });
    fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ key: "boy" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.value) return;
        const prevEntries = JSON.parse(data.value);
        const obj = JSON.parse(prevEntries);
        console.log(obj);
        setBoyActivities(obj);
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
