import logo from "/logo.png";
interface Props {
  className?: string;
}
function Logo({ className }: Props) {
  return (
    // <div className="flex h-full items-center">
    <img className={`${className}`} src={logo}></img>
    // </div>
  );
}

export default Logo;
