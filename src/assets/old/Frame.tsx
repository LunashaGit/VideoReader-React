type Props = {
  children: React.ReactNode;
  css?: string;
};

export default function Frame(props: Props) {
  return <div className={props.css}>{props.children}</div>;
}
