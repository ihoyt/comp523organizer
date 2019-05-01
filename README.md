## Development Server Install
-clone the repository to the desired location on your computer - git clone <repo>
-cd into the project directory
-run 'npm install' to download and install project dependencies
-run 'npm start' to run the development Server

If you would like to create a production build for deployment on a server other than Heroku, run 'npm build' and the project will
be built to the /public folder of the project

## Heroku deployment
-Log in to Heroku
-Click 'Create New App'
-Choose app name and click 'Create app'
-Select GitHub under the 'Deployment method' section of the interface
-Enter the repository name (not the url) in the search box and choose 'Connect' to link the GitHub repo to Heroku
-From here, either choose 'Deploy Branch' under Manual Deploy at the bottom of the screen (will have to be run everytime changes
  are made to the code), or select 'Enable Automatic Deploys' in order for Heroku to automatically re-deploy whenever code changes are detected

## Firebase Setup

## App Usage
### Dashboard
Here is the main interface for viewing and categorizing projects. Proposals are split into 4 categories: New proposals that have not yet been categorized, accepted, maybe, and rejected proposals. The semester filter allows the user to view proposals from previous semesters. Clicking on a proposal will bring the user to the ProposalDetails componentDidMount

### Proposal Details
Here information about the proposal can be viewed. The proposal can be categorized using the buttons below the proposal information.

### Create Proposal
A form for submitting project proposals. This is the only page/component viewable by an unauthenticated user. All form fields must be valid and the user have accepted the user agreement for submission to be enabled. Form validation checks to make sure all fields (except option URL) are populated and checks proper formatting of the email and phone number fields. Form validation can be modified within the validateFields() function of the CreateProposal component

### Send email

### Templates
Here is where the email templates can be modified. Each template consists of a dropdown allowing the user to modify the subject line and actual content of the template. React-Quill allows for HTML type formatting of the email body, as well as insertion of links.
