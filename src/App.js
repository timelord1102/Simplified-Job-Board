import './App.css';
import React from 'react';
import { createJobArray } from './jobs.js';
import mp3_file from './Audio/Cyber Grind (Ultrakill Soundtrack).mp3';


let sponsorship = false
let remote = false
let roles = new Set()
let role = "All"

function checkJob(job) {
  var isRole = false
  for (let role of roles) {
    if (job.title.includes(role)) {
      isRole = true
      break
    }
  }
  if (roles.size === 0) {
    isRole = true
  }
  return (job.locations.includes("remote") || !remote) && (job.sponsorship === "Offers Sponsorship" || !sponsorship) && isRole
}

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

      <div className="filterContainer">
        <div className="checkboxes">
          <label className="sponsContainer"> Sponsorship
            <input
              type="checkbox"
              id="offers-sponsorship-checkbox"
              checked={sponsorship}
              onChange={() => {
                sponsorship = sponsorship === true ? false : true;
                filterJobs(basejobs.filter(j => checkJob(j)));
              }}
            />
            <span className="checkmark"></span>
          </label>

          <label className="sponsContainer"> Remote
            <input
              type="checkbox"
              id="is-remote-checkbox"
              checked={remote}
              onChange={() => {
                remote = remote === true ? false : true;
                filterJobs(basejobs.filter(j => checkJob(j)));
              }}
            />
            <span className="checkmark"></span>
          </label>
        </div>

        <div className="roleDrop">
          <button className="role">Positions</button>
          <div className="roleContent">
            <label for="software-developer">
              <input type="checkbox" id="software-developer" name="software-developer" value="software-developer"></input>
              Software Developer
              <span className="checkmark"></span>
            </label>
            <label for="product-manager">
              <input type="checkbox" id="product-manager" name="product-manager" value="Product Manager"></input>
              Product Manager
              <span className="checkmark"></span>
            </label>
            
            <label for="ui-designer">
              <input type="checkbox" id="ui-designer" name="ui-designer" value="UI Designer"></input>
              UI Designer
              <span className="checkmark"></span>
            </label>
            
            <label for="data-science">
              <input type="checkbox" id="data-science" name="data-science" value="Data Science"></input>
              Data Science
              <span className="checkmark"></span>
            </label>
            
            <label for="ai-ml">
              <input type="checkbox" id="ai-ml" name="ai-ml" value="AI/ML"></input>
              AI/ML
              <span className="checkmark"></span>
            </label>
            
            <label for="security">
              <input type="checkbox" id="security" name="security" value="Security"></input>
              Security
              <span className="checkmark"></span>
            </label>
            
            <label for="it">
              <input type="checkbox" id="it" name="it" value="IT"></input>
              IT
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="jobListings">
      <div className='results'>Results: {jobs.length}</div>
      {jobs.map(job => (
        <li className='Jobs' key={job.id}>
          <h2></h2>
          <h3>{job.title}</h3>
          <h4>{job.company}</h4>
          <h5>
            <button className = 'apply' onClick={() => window.open(job.url)}>APPLY</button>
          </h5>
          
        </li>

      ))}
    </div>
    </div>
    
  );
}

const basejobs = await createJobArray()
console.log(basejobs)

export default App;