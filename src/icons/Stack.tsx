interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const StackIcon = (props: SVGProps) => (
  <svg
    // width="24"
    // height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.179 15L2 17.25L6.179 19.5L11.75 22.5L14.5355 21L17.321 19.5L21.5 17.25L17.321 15"
      // stroke="#FCB32C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-brand-300"
    />
    <path
      d="M6.179 10L2 12.25L6.179 14.5L11.75 17.5L14.5355 16L17.321 14.5L21.5 12.25L17.321 10"
      // stroke="#7C3AED"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-brand-500"
    />
    <path
      d="M6.179 9.5L11.75 12.5L17.321 9.5M6.179 9.5L2 7.25L6.875 4.625L11.75 2L21.5 7.25L17.321 9.5"
      // stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-brand-800"
    />
  </svg>
);

export default StackIcon;
