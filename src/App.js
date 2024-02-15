import logo from './logo.svg';
import './App.css';
import React from 'react';
import { createJobArray } from './jobs.js';


let sponsorship = ""

function JobFilter({job}) {
  if (job.sponsorship === sponsorship || sponsorship === "") {
    return (
      <li key={job.id}>
        <h3>{job.title}</h3>
        <h4>{job.company}</h4>
        <h5>{job.locations}</h5>
        <h5>{job.sponsorship}</h5>
      </li>
    )
  }
  return null

}

function val() {
  return document.getElementById("sponsorship").value;
}

function App() {
  const [jobs, filterJobs] = React.useState(
    basejobs
  )
  const [sponsorship, setSponsorship] = React.useState("")


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <select id = "sponsorship">
        <option value="">All</option>
        <option value="Offers Sponsorship">Offers Sponsorship</option>
        <option value="Does Not Offer Sponsorship">Does Not Offer Sponsorship</option>
      </select>
      
      <button onClick={() => filterJobs(
        basejobs.filter(j => j.sponsorship ===  val() || val() === "")
      )}>Apply</button>
      {jobs.map(job => (
        <li key={job.id}>
          <h3>{job.title}</h3>
          <h4>{job.company}</h4>
          <h5>{job.locations}</h5>
          <h5>{job.sponsorship}</h5>
        </li>

      ))}

    </div>
  );
}

const basejobs = await createJobArray()
console.log(basejobs)
export default App;
