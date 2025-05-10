import React, { useEffect, useState } from 'react';
import WorldMap from './WorldMap.tsx';
import { makeQuestion } from './utils/makeQuestion.ts';
import Flag from './Flag.tsx';
// import countries from './data/countries_data.json';
import world from './data/world-countries.json';
// import { CountryClass } from './utils/types.ts';

function App() {
  const [question, setQuestion] = useState<any>();

  useEffect(() => {
    makeQuestion(1, world.features).then((res) => {
      setQuestion(res.answer);
    }
    );
  }, []);
  const country = {
    name: 'Egypt',
    flag: 'https://flagcdn.com/w640/eg.png',
  }
  return (
    <div style={{ margin: '10px' }}>
      {
        question ?
          <>
            <Flag name={question?.properties?.name} code={question?.code} />
            <WorldMap targetCountry={question?.properties?.name} />
          </>
          :
          null
      }
    </div>
  );
}

export default App;
