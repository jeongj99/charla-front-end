export default function Marginer(props) {
  const { direction, margin } = props;

  if (direction === "horizontal") {
    return (
      <span className="horizontal-margin" style={{ width: typeof margin === "string" ? margin : `${margin}px` }}></span>
    );
  } else {
    return (
      <span className="vertical-margin" style={{ width: typeof margin === "string" ? margin : `${margin}px` }}></span>
    );
  }
}

Marginer.defaultProps = {
  direction: "horizontal"
};