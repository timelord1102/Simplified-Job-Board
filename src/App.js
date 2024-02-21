import './App.css';
import React from 'react';
import { createJobArray } from './jobs.js';
import mp3_file from './Audio/Cyber Grind (Ultrakill Soundtrack).mp3';


let sponsorship = false
let remote = false

var roleSearch = {"software-engineer": ["software-engineer", "software engineer", "software-developer", "software developer"], "product-manager": [" pm", "product manager", "pm "], "ui-designer": [" ui", "ui designer", "ui ", " ux", "ux ", "ux designer", "ui/ux"], "data-science": ["data", "data science"], "ai-ml": ["ai ", "ml ", "ai/ml", " ai", " ml"], "security": ["security"], "it": [" it", "it ", "information technology", "information-technology", "information technology "]}

function checkJob(job) {
  var isRole = false
  /*get all checked roles in roleDrop*/
  var roles = new Set()
  var checkboxes = document.querySelectorAll('.roleContent input[type="checkbox"]')
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      roles.add(checkbox.value)
    }
  }

  for (let role of roles) {
    var search = roleSearch[role]
    console.log(search)
    for (let term of search) {
      if (job.title.toLowerCase().includes(term)) {
        isRole = true
      }
    }
  }
  if (roles.size === 0) {
    isRole = true
  }

  return (job.locations.includes("remote") || !remote) && (job.sponsorship === "Offers Sponsorship" || !sponsorship) && isRole
}

function reset() {
  var checkboxes = document.querySelectorAll('.roleContent input[type="checkbox"]')
  for (let checkbox of checkboxes) {
    checkbox.checked = false
  }
  document.getElementById('offers-sponsorship-checkbox').checked = false
  document.getElementById('is-remote-checkbox').checked = false
  sponsorship = false
  remote = false
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
          <label className="sponsContainer"> SPONSORSHIP
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

          <label className="sponsContainer"> REMOTE
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
          <button className="role">POSITIONS</button>
          <div className="roleContent" onClick={() => {
                filterJobs(basejobs.filter(j => checkJob(j)));
              }}>
            <label htmlFor="software-engineer">
              <input type="checkbox" id="software-engineer" name="software-developer" value="software-engineer"></input>
              SOFTWARE DEVELOPER
              <span className="checkmark"></span>
            </label>
            <label htmlFor="product-manager">
              <input type="checkbox" id="product-manager" name="product-manager" value="product-manager"></input>
              PRODUCT MANAGER
              <span className="checkmark"></span>
            </label>
            
            <label htmlFor="ui-designer">
              <input type="checkbox" id="ui-designer" name="ui-designer" value="ui-designer"></input>
              UI DESIGNER
              <span className="checkmark"></span>
            </label>
            
            <label htmlFor="data-science">
              <input type="checkbox" id="data-science" name="data-science" value="data-science"></input>
              DATA SCIENCE
              <span className="checkmark"></span>
            </label>
            
            <label htmlFor="ai-ml">
              <input type="checkbox" id="ai-ml" name="ai-ml" value="ai-ml"></input>
              AI/ML
              <span className="checkmark"></span>
            </label>
            
            <label htmlFor="security">
              <input type="checkbox" id="security" name="security" value="security"></input>
              SECURITY
              <span className="checkmark"></span>
            </label>
            
            <label htmlFor="it">
              <input type="checkbox" id="it" name="it" value="it"></input>
              IT
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="resetContainer">
          <button className="reset" onClick={() => {
          reset();
          filterJobs(basejobs.filter(j => checkJob(j)));
          }}>RESET</button>
        </div>  
      </div>
      <div className="jobListings">
      <div className='results'>RESULTS: {jobs.length}</div>
      {jobs.map(job => (
        <li className='Jobs' key={job.id}>
          <h2></h2>
          <h3>{job.title.toUpperCase()}</h3>
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