const Arrow = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.175 19L19 12.5L12.175 6L11.4327 6.707L16.9903 12L5 12V13L16.9903 13L11.4327 18.293L12.175 19Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Arrow
