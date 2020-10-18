import React from 'react';

interface IfModel {
    condition: any;
    children: any;
}

export default function IfDirective(props: IfModel) {
  return (
    <React.Fragment>
      { props && props.condition ? props.children : null}
    </React.Fragment>
  );
}