import React from 'react';
import { CountryClass } from './utils/types';

interface FlagProps {
  name: string;
  code: string;
}

const Flag = ({ name, code }: FlagProps) => {

  return (
    <div style={{ flexDirection: "column", alignContent: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <img src={`https://flagcdn.com/w640/${code}.png`} alt={name} style={{ width: '150px', height: 'auto' }} />
      <h1>{name}</h1>
    </div>
  );
}

export default Flag;