import React, { Fragment } from 'react';
import { getStroke } from 'perfect-freehand';
import { useStore } from './store';
import { useOptionStore } from './options';
import { getSvgPathFromStroke } from './utils';

export const Paths = () => {
  const data = useStore();
  if (data.points !== undefined) {
    return (
      <Fragment>
        {Object.keys(data.points).map((key, index) => (
          <CreatePath key={key} keyName={key} index={index} data={data.points[key]} fillColor={data.fill[key]} />
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment></Fragment>
  )
};

type CreatePathProps = {
  data: number[][];
  keyName: string;
  index: number;
  fillColor: string | undefined;
};

const CreatePath = ({ data = [], index, keyName, fillColor }: CreatePathProps) => {
  const { container, ...options } = useOptionStore();
  const stroke = getStroke(data, options);
  const pathData = getSvgPathFromStroke(stroke);
  return <path d={pathData} fill={fillColor}/>;
};
