## Development Server Install
-clone the repository to the desired location on your computer - git clone 'repo-name'  
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
### Database
-Log in to Firebase and select 'Go to console' in the top-right corner  
-Select Add Project, enter project name, accept the controller-controller terms, and click Create Project  
-Select the Web option under 'Get started by adding Firebase to your app'  
-Copy 'var config' assignment into config/fbConfig.js in the project folder (overwrite it if it already exists). This will connect the project to Firebase  
-Select Database from the left-hand menu, and select Create Database  
-Select Start in test mode and click enable
-From here add the following collections: 'emails' and 'proposals'  
-The schemas are as follows:  
email- body: string, subject: string, type: string  
proposals- category: int, proposeeEmail, proposeeFname, proposeeLname, proposeeOrg, proposeePhone,
                proposeeURL, semester, summary, and title (all strings)  
The email schema must be created in order for the app to function properly, however the proposal schema can be auto-generated by the application itself.

### Authentication
No method to create users exists within the application itself (due to the small number of authenticated users needed), however users can be added using the Firebase Authentication interface. From the main Firebase console, select Authentication from the menu on the left. The first time this is done on a new project, the sign-in method must be selected. Enable email/password as the sign-in provider (Google could also possibly be used, but this is untested). From here select Users from the menu at the top, and a new user can be added. At least one user must exist in order to access pages other than the Create Proposal form.

## App Usage
### Dashboard URL='/'
Here is the main interface for viewing and categorizing projects. Proposals are split into 4 categories: New proposals that have not yet been categorized, accepted, maybe, and rejected proposals. The semester filter allows the user to view proposals from previous semesters. Clicking on a proposal will bring the user to the ProposalDetails

### Proposal Details
Here information about the proposal can be viewed. The proposal can be categorized using the buttons below the proposal information.

### Create Proposal URL='/create'
A form for submitting project proposals. This and the submission success screen are the only pages/components viewable by an unauthenticated user. All form fields must be valid and the user have accepted the user agreement for submission to be enabled. Form validation checks to make sure all fields (except optional URL) are populated and checks proper formatting of the email and phone number fields. Form validation can be modified within the validateFields() function of the CreateProposal component

### Send email URL='/sendmail'

### Templates URL='/templates'
Here is where the email templates can be modified. Each template consists of a dropdown allowing the user to modify the subject line and actual content of the template. React-Quill allows for HTML type formatting of the email body, as well as insertion of links.