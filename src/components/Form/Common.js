import classNames from "classnames";

import "./Common.css";

export function CommonContainer(props) {
  return (
    <div className="common-container">{props.children}</div>
  );
}

export function CommonForm(props) {
  return (
    <form className="common-form-container" autoComplete="off" onSubmit={event => event.preventDefault()}>{props.children}</form>
  );
}

export function CommonLink(props) {
  const commonLinkClass = classNames({
    "muted-link": props.muted,
    "bold-link": props.bold
  });

  return (
    <a className={commonLinkClass} href={props.href} onClick={props.onClick}>{props.children}</a>
  );
}

export function CommonInput(props) {
  return (
    <input
      className="form-input"
      name={props.name} type={props.type}
      placeholder={props.placeholder} value={props.value}
      onChange={event => props.onChange(event.target.value)}
      ref={props.ref}
    />
  );
}

export function CommonSubmitButton(props) {
  return (
    <button className="form-submit" onClick={props.onClick}>{props.children}</button>
  );
}