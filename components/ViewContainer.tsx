type ViewContainerProps = {
  components: { [key: string]: any };
  currentName: string;
};
export default function ViewContainer(props: ViewContainerProps) {
  if (props.components[props.currentName])
    return props.components[props.currentName]();
  return <></>;
}
