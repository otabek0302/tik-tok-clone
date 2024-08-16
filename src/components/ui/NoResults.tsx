import { MdOutlineVideocamOff } from "react-icons/md";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <MdOutlineVideocamOff className="text-4xl fill-copy-light" />
      <p className="text-copy-light text-xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
