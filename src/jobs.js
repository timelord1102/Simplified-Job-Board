class Job {
    constructor(data) {
        this.company = data.company_name;
        this.locations = data.locations;
        this.title = data.title;
        this.url = data.url;
        this.date_posted = data.date_posted;
        this.sponsorship = data.sponsorship;
        this.id = data.id;
    }
}

export async function createJobArray() {
    const response = await fetch('https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/.github/scripts/listings.json')
    const data = await response.json()
    console.log(data)
    let jobArray = []
    for (let job of data) {
        if(job.active !== false) {
            jobArray.push(new Job(job))
        }
    }
    console.log("jobArray", jobArray)
    return jobArray
}

