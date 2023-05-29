import './Marginer.css';

export default function Marginer(props) {
  const { direction, margin } = props;

  if (direction === 'horizontal') {
    return (
      <span
        className="horizontal-margin"
        style={{ width: typeof margin === 'string' ? margin : `${margin}px` }}
      />
    );
  } else {
    return (
      <span
        className="vertical-margin"
        style={{ height: typeof margin === 'string' ? margin : `${margin}px` }}
      />
    );
  }
}

Marginer.defaultProps = {
  direction: 'horizontal',
};
