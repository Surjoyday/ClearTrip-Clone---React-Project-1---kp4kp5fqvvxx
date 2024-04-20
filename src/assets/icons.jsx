function RightLeftArrow() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="16" fill="white"></rect>
      <path
        d="M24.1666 14.8333H7.83325"
        stroke="#3366CC"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.83325 14.8333L13.6666 9"
        stroke="#3366CC"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.83342 18.3335H24.1667"
        stroke="#3366CC"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M24.1667 18.3334L18.3334 24.1667"
        stroke="#3366CC"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle
        cx="16"
        cy="16"
        r="13.375"
        stroke="#3366CC"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
    </svg>
  );
}

const flightIcons = {
  "6E001": "/public/images/6E.svg",
  UKOO1: "/public/flights_logos/UK.jpg",
  AI001: "/public/images/AI.svg",
  SG001: "/public/images/SG.svg",
  G801: "/public/images/G8.svg",
};

export { RightLeftArrow, flightIcons };
