import logo from './logo.svg';
import './App.css';

import Title from './components/Text/Title';
import InitQuestions from './components/Text/InitQuestions';
import History from './components/Text/History';
import Change from './components/Text/Change';
import MentalHealth from './components/Text/MentalHealth';
import Interview from './components/Text/Interview';
import Takeaways from './components/Text/Takeaways';
import Compare from './components/Text/Compare';
import Habits from './components/Text/Habits';
import Citations from './components/Text/Citations';

function App() {
  return (
    <>
      <div className='title-container'>
        <Title/>
      </div>
      {/*<div className='counter-container'>
        <Counter/>
      </div>*/}
      <div className='main-container'>
        <div className='init-questions-container'>
          <InitQuestions/>
        </div>
        <div className='history-container'>
          <History/>
        </div>
        <div className='change-container'>
          <Change/>
        </div>
        <div className='mental-health-container'>
          <MentalHealth/>
        </div>
        <div className='interview-container'>
          <Interview/>
        </div>
        <div className='takeaways-container'>
          <Takeaways/>
        </div>
        {/*<div className='compare-container'>
          <Compare/>
        </div>*/}
        <div className='habits-container'>
          <Habits/>
        </div>
        <div className='citations-container'>
          <Citations/>
        </div>

        {/*<div className='internetUseByAge'>
            <InternetUseByAge />
        </div>*/}
      </div>
    </>
  );
}

export default App;

/*
Focus on design + narrative

fix fonts
fix writing formating
add illistration
add animation
general chart styling
general styling

animation

counter
-average daily screentime = 7h3m - 7am-11pm

*/