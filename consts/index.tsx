import {
  faCoffee,
  faIceCream,
  faVideo,
  faBowlingBall,
  faMotorcycle,
  faBowlRice,
  faHospital,
  faFootball,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const activities = [
  { value: "date", label: "Date" },
  { value: "ice-cream", label: "Ice Cream" },
  { value: "movie", label: "Movie" },
  { value: "bowling", label: "Bowling" },
  { value: "ride", label: "Ride" },
  { value: "treat", label: "Treat" },
  { value: "hospital", label: "Hospital" },
  { value: "futsal", label: "Futsal" },
];

export const flags: any = {
  date: () => <FontAwesomeIcon icon={faCoffee} />,
  "ice-cream": () => <FontAwesomeIcon icon={faIceCream} />,
  movie: () => <FontAwesomeIcon icon={faVideo} />,
  bowling: () => <FontAwesomeIcon icon={faBowlingBall} />,
  ride: () => <FontAwesomeIcon icon={faMotorcycle} />,
  treat: () => <FontAwesomeIcon icon={faBowlRice} />,
  hospital: () => <FontAwesomeIcon icon={faHospital} />,
  futsal: () => <FontAwesomeIcon icon={faFootball} />,
};
