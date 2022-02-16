import {
  FunctionComponentElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

type ViewContainerProps = {
  children?: ReactNode;
  currentName: string;
};
export default function ViewContainer(props: ViewContainerProps) {
  const [current, setCurrent] = useState<ReactNode>();

  useEffect(() => {
    const child = (props.children as FunctionComponentElement<any>[]).find(
      (ch) => ch.type.name === props.currentName
    );
    setCurrent(child);
  }, [props.currentName]);

  return <>{current}</>;
}
