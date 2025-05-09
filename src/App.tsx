import React, { useEffect } from 'react';
import WorldMap from './WorldMap.tsx';
import { makeQuestion } from './utils/makeQuestion.ts';
import Flag from './Flag.tsx';
import countries from './data/countries_data.json';
import { CountryClass } from './utils/types.ts';

function App() {
  const [question, setQuestion] = React.useState<CountryClass>();

  useEffect(() => {
    makeQuestion(1, countries).then((res) => {
      console.log(res);
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
            <Flag name={question?.name} code={question?.code} />
            <WorldMap targetCountry={question?.name} />
          </>
          :
          null
      }
    </div>
  );
}

export default App;
