import './App.css';
import React from 'react';
import { createJobArray } from './jobs.js';
import mp3_file from './Audio/Cyber Grind (Ultrakill Soundtrack).mp3';


let sponsorship = "All"

function App() {
  const [jobs, filterJobs] = React.useState(
    basejobs
  )

  var audio = new Audio(mp3_file);
  function togglePlay() {
    var play = document.querySelector('.play');
    if (play.innerHTML === '❚❚') {
      audio.pause()
      play.innerHTML = '▶';
    } else {
      audio.play();
      play.innerHTML = '❚❚';
    }
  }

  return (
    <div className="App">
      <h1>
        <p className='play' onClick={togglePlay}>▶</p>
        <p className='title'>
          ECONOMY IS DEAD.
          <br />
          DEPRESSION IS FUEL.
          <br />
          JOBS ARE FULL.
        </p>
      </h1>
    <div className = "sponsorDrop">
      <button className = "sponsorship">{sponsorship}</button>
      <div className = "sponsorshipContent">
        <p onClick={() => {
          sponsorship = "All";
          filterJobs(basejobs)}}>All</p>

        <p onClick={() => {
          sponsorship = "Offers Sponsorship"
          filterJobs(basejobs.filter(j => j.sponsorship === "Offers Sponsorship" || sponsorship === ""))}}>Offers Sponsorship</p>
      </div>
    </div>
      {jobs.map(job => (
        <li className='Jobs' key={job.id}>
          <h2></h2>
          <h3>{job.title}</h3>
          <h4>{job.company}</h4>
          <h5>
            <button className = 'apply' onClick={() => window.open(job.url, '_blank')}>APPLY</button>
          </h5>
          
        </li>

      ))}

    </div>
    
  );
}

const basejobs = await createJobArray()
console.log(basejobs)

export default App;
