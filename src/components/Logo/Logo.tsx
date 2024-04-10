interface Props {
  className?: string;
}
function Logo({ className }: Props) {
  return (
    // <div className="flex h-full items-center">
    <img className={`${className}`} src="\Logo.png"></img>
    // </div>
  );
}

export default Logo;
