# DecodeLabs Internship — Multi-Track Project Implementation

> IMPORTANT:
> This document is the source of truth for the currently provided DecodeLabs
> internship tasks.
>
> Current scope:
> - Artificial Intelligence — Project 1
> - Artificial Intelligence — Project 2
> - Full Stack Development — Project 1
> - Full Stack Development — Project 2
>
> This PRD is intentionally extensible.
> When additional DecodeLabs task PDFs/messages are provided later, append the
> new project requirements to this document without breaking completed work.

---

# 0. PROJECT CONFIGURATION

## GitHub Repository

Set the GitHub repository URL here.

```text
GITHUB_REPOSITORY_URL="https://github.com/bluekitsune-sad/DecodeLabs-Internship.git"
````

This value must have one source of truth.

Do NOT hardcode the GitHub URL in multiple files.

If the project needs the URL in application code, documentation, or metadata,
read it from the central configuration.

---

# 1. AGENT OPERATING INSTRUCTIONS

You are the implementation agent responsible for completing the DecodeLabs
internship projects described in this PRD.

Your job is NOT to merely create a demonstration.

Your job is to produce:

1. Working projects
2. Clean source code
3. Correct project structure
4. Documentation
5. Testing/verification
6. README files
7. GitHub-ready repositories
8. Clear separation between the different internship projects

Follow the requirements exactly.

---

# 2. MOST IMPORTANT RULES

## Rule 1 — Do not invent official requirements

Only implement requirements that are explicitly stated in:

* This PRD
* DecodeLabs task PDFs
* Future task PDFs/messages added to this PRD

You may make reasonable implementation decisions where the task leaves
implementation details open.

However, clearly separate:

* REQUIRED
* RECOMMENDED
* IMPLEMENTATION CHOICE

Do not turn optional ideas into mandatory features.

---

## Rule 2 — Do not over-engineer beginner projects

These projects are internship training milestones.

Do not unnecessarily add:

* Authentication systems
* Databases
* Cloud infrastructure
* Microservices
* Docker
* Kubernetes
* LLM APIs
* Payment systems
* Complex state management
* Large frameworks
* Unrequested external APIs

unless a future official task explicitly requires them.

The goal is to demonstrate the skills specified by DecodeLabs.

---

## Rule 3 — Do not replace the required technology

If a task specifically requires:

* HTML
* CSS
* JavaScript
* Python
* KNN
* Scikit-learn
* CSS Grid
* Flexbox
* Semantic HTML

then those requirements must actually be used.

Do not replace a required concept with an easier abstraction.

---

## Rule 4 — Read the existing repository before changing anything

Before implementing:

1. Inspect the current directory.
2. Inspect existing files.
3. Inspect package/configuration files.
4. Determine whether a project already exists.
5. Do not overwrite existing work blindly.
6. Preserve useful existing work unless it conflicts with the official task.

---

## Rule 5 — Keep projects isolated

The four current projects are:

```text
AI Project 1
AI Project 2

Full Stack Project 1
Full Stack Project 2
```

Do not mix their implementation.

Recommended structure:

```text
DecodeLabs-Internship/
│
├── README.md
│
├── Artificial-Intelligence/
│   ├── Project-1-Rule-Based-Chatbot/
│   └── Project-2-Data-Classification/
│
├── Full-Stack-Development/
│   ├── Project-1-Responsive-Frontend/
│   └── Project-2-Backend-API/
│
└── docs/
    └── ...
```

If the repository already has another structure, preserve it when practical,
but maintain clear project separation.

---

# 3. CURRENT PROJECT MATRIX

| Track                   | Project | Main Requirement              | Technology                 |
| ----------------------- | ------- | ----------------------------- | -------------------------- |
| Artificial Intelligence | P1      | Rule-Based AI Chatbot         | Python preferred           |
| Artificial Intelligence | P2      | Data Classification Using AI  | Python + scikit-learn      |
| Full Stack Development  | P1      | Responsive Frontend Interface | HTML + CSS + JavaScript    |
| Full Stack Development  | P2      | Backend API Development       | Backend framework/language |

---

# 4. ARTIFICIAL INTELLIGENCE — PROJECT 1

# Rule-Based AI Chatbot

## 4.1 Objective

Create a simple rule-based chatbot that responds to predefined user inputs.

The project is intended to demonstrate:

* Control flow
* Decision-making
* Basic AI concepts
* Deterministic logic
* Input handling
* Continuous interaction

This is NOT a generative AI chatbot.

---

# 4.2 REQUIRED FUNCTIONALITY

The chatbot MUST:

* Accept user input.
* Continuously accept additional input.
* Normalize/sanitize the input.
* Recognize predefined intents.
* Return predefined responses.
* Handle greetings.
* Handle an exit command.
* Provide a fallback response for unknown input.
* Continue running until the user explicitly exits.

---

# 4.3 INPUT SANITIZATION

User input must be normalized before matching.

At minimum:

```python
user_input = input("You: ").lower().strip()
```

The implementation must therefore handle differences such as:

```text
Hello
hello
HELLO
 hello
hello
```

as the same logical input where appropriate.

Do not rely exclusively on exact case-sensitive matching.

---

# 4.4 CONTINUOUS LOOP

The chatbot must operate continuously.

Required conceptual structure:

```text
START
  ↓
Receive user input
  ↓
Sanitize input
  ↓
Check exit command
  ↓
Find matching intent
  ↓
Return response
  ↓
Repeat
```

The loop should continue until an exit command is detected.

A clean `break` should be used to terminate the loop.

---

# 4.5 KNOWLEDGE BASE

The chatbot must use a dictionary/key-value structure for its responses.

Do NOT create a huge `if/elif` ladder for every possible response.

Preferred pattern:

```python
responses = {
    "hello": "Hi there!",
    "bye": "Goodbye!"
}
```

Then use dictionary lookup with a fallback.

Conceptually:

```python
reply = responses.get(user_input, "I do not understand.")
```

---

# 4.6 MINIMUM INTENTS

The knowledge base must contain AT LEAST 5 meaningful intents.

Recommended implementation:

```text
1. greeting
2. help
3. name / identity
4. thanks
5. basic information
6. farewell / exit
```

The exact wording may be chosen by the agent.

The implementation must remain simple and deterministic.

---

# 4.7 EXIT STRATEGY

The chatbot must have a clean exit command.

Support at least:

```text
exit
```

Optionally:

```text
quit
bye
goodbye
```

If multiple exit words are supported, document them in the README.

The exit command must terminate the loop cleanly.

---

# 4.8 FALLBACK

Unknown input must not crash the program.

Example:

```text
You: something random

Bot: I do not understand that yet.
```

The fallback response must be deterministic.

---

# 4.9 DO NOT USE LLMs

Do NOT use:

* OpenAI API
* Gemini
* Claude
* DeepSeek
* OpenRouter
* Hugging Face generative models
* LangChain
* Any external generative AI API

for Project 1.

The purpose of this task is deterministic rule-based logic.

The instructional material may discuss future hybrid/LLM architectures, but
Project 1 itself is the rule-based foundation.

---

# 4.10 AI P1 FILE STRUCTURE

Recommended:

```text
Project-1-Rule-Based-Chatbot/
│
├── chatbot.py
├── README.md
├── requirements.txt
└── .gitignore
```

If no external dependencies are required, `requirements.txt` may be empty
or omitted.

---

# 4.11 AI P1 README

README must contain:

```text
Project Title
Description
Objective
Features
Technologies Used
How It Works
Supported Intents
Exit Commands
How to Run
Example Interaction
Project Structure
Future Improvements
```

Do not claim that the chatbot uses machine learning or an LLM.

---

# 4.12 AI P1 ACCEPTANCE CRITERIA

The project is complete only when:

* [ ] Program starts successfully.
* [ ] User can enter text.
* [ ] Input is normalized.
* [ ] Greeting works.
* [ ] At least 5 intents are supported.
* [ ] Responses come from predefined rules/data.
* [ ] Unknown input receives fallback response.
* [ ] Program continues after normal messages.
* [ ] Exit command terminates program.
* [ ] No crash occurs for normal unknown input.
* [ ] No external LLM/API is used.
* [ ] README exists.
* [ ] README explains how to run the project.
* [ ] Code is clean and understandable.

---

# 5. ARTIFICIAL INTELLIGENCE — PROJECT 2

# Data Classification Using AI

## 5.1 Objective

Build a basic supervised classification model using a small dataset.

The project must demonstrate:

* Dataset handling
* Feature preparation
* Feature scaling
* Train/test splitting
* Supervised learning
* Model training
* Prediction
* Model evaluation

---

# 5.2 DATASET

Use the Iris dataset.

The provided DecodeLabs material describes the Iris benchmark as:

```text
Samples: 150
Classes: 3
Dimensions/features: 4
```

The four features are:

```text
sepal length
sepal width
petal length
petal width
```

The three classes are the Iris species/classes represented by the dataset.

---

# 5.3 REQUIRED PIPELINE

Implement this pipeline:

```text
Load Dataset
     ↓
Understand Dataset
     ↓
Separate Features and Target
     ↓
Feature Scaling
     ↓
Train/Test Split
     ↓
Create KNN Model
     ↓
Train Model
     ↓
Predict Test Data
     ↓
Evaluate Predictions
     ↓
Display Results
```

---

# 5.4 FEATURE SCALING

Apply feature scaling.

Use:

```text
StandardScaler
```

The scaler must be fitted using training data and then applied to the test
data.

Avoid data leakage.

Preferred conceptual flow:

```python
scaler.fit(X_train)

X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

---

# 5.5 TRAIN/TEST SPLIT

Split the dataset into training and testing sets.

The DecodeLabs instructional material illustrates an approximately:

```text
80% Training
20% Testing
```

split.

Use an appropriate reproducible `random_state`.

Prefer stratified splitting so the class distribution remains reasonable.

---

# 5.6 CLASSIFICATION ALGORITHM

Use:

```text
K-Nearest Neighbors (KNN)
```

with:

```python
KNeighborsClassifier
```

The instructional material specifically demonstrates:

```python
KNeighborsClassifier(n_neighbors=5)
```

Therefore use:

```text
n_neighbors = 5
```

unless there is a documented reason to change it.

---

# 5.7 MODEL WORKFLOW

The implementation must include the equivalent of:

```python
model = KNeighborsClassifier(n_neighbors=5)

model.fit(X_train, y_train)

predictions = model.predict(X_test)
```

If using a scikit-learn Pipeline, the scaler and model may be combined into
one clean pipeline.

---

# 5.8 EVALUATION

Do not only print accuracy.

The project must demonstrate deeper classification evaluation.

Include:

```text
Confusion Matrix
F1 Score
```

Also include accuracy where useful.

Prefer reporting:

```text
Accuracy
Precision
Recall
F1 Score
Confusion Matrix
```

for a complete evaluation.

---

# 5.9 CONFUSION MATRIX

Generate and display a confusion matrix.

It should clearly show:

```text
Actual vs Predicted
```

and identify the three Iris classes.

The confusion matrix should be understandable to someone reviewing the
project.

---

# 5.10 F1 SCORE

Calculate an F1 score.

Because this is a multi-class classification problem, use an appropriate
multi-class averaging strategy and document which strategy is used.

Example:

```text
weighted
```

or

```text
macro
```

Do not hide the averaging method.

---

# 5.11 OPTIONAL VISUALIZATION

Visualization is encouraged where it improves understanding.

Useful visualizations include:

* Confusion matrix
* Feature distribution
* Class distribution
* Prediction comparison

Do not turn this into an unnecessarily large data science dashboard.

---

# 5.12 AI P2 FILE STRUCTURE

Recommended:

```text
Project-2-Data-Classification/
│
├── main.py
├── README.md
├── requirements.txt
├── results/
│   └── confusion_matrix.png
├── notebooks/
│   └── analysis.ipynb        # optional
└── .gitignore
```

If a notebook is created, it must not replace the clean runnable Python
implementation unless explicitly required.

---

# 5.13 AI P2 DEPENDENCIES

Use appropriate Python libraries.

Expected:

```text
scikit-learn
matplotlib
pandas
numpy
```

Only include libraries that are actually used.

---

# 5.14 AI P2 README

README must contain:

```text
Project Title
Problem Statement
Objective
Dataset
Dataset Description
Features
Machine Learning Approach
Preprocessing
Feature Scaling
Train/Test Split
KNN Algorithm
Model Training
Evaluation Metrics
Confusion Matrix
Results
How to Run
Project Structure
Limitations
Future Improvements
```

Explain the workflow in beginner-friendly language.

---

# 5.15 AI P2 ACCEPTANCE CRITERIA

* [ ] Iris dataset is loaded.
* [ ] Dataset is inspected/understood.
* [ ] Features and target are separated.
* [ ] Feature scaling is implemented.
* [ ] Training and testing data are separated.
* [ ] Split is reproducible.
* [ ] KNN is used.
* [ ] `n_neighbors=5` is used unless justified otherwise.
* [ ] Model is trained.
* [ ] Test predictions are generated.
* [ ] Accuracy is calculated.
* [ ] Confusion matrix is generated.
* [ ] F1 score is calculated.
* [ ] Results are clearly displayed.
* [ ] No data leakage occurs.
* [ ] README exists.
* [ ] Project runs from a clean environment.

---

# 6. FULL STACK DEVELOPMENT — PROJECT 1

# Responsive Frontend Interface

## 6.1 OBJECTIVE

Create a responsive frontend interface for a simple web application.

The primary purpose is to demonstrate:

* HTML5
* CSS3
* Basic JavaScript
* Responsive design
* Mobile-first development
* Semantic HTML
* UI fundamentals
* Accessibility
* Clean layout architecture

---

# 6.2 FRAMEWORK RESTRICTION

Do NOT use frontend frameworks for this project.

Do not use:

* React
* Next.js
* Vue
* Nuxt
* Angular
* Svelte
* Bootstrap
* Tailwind CSS

The project must demonstrate the fundamentals directly.

Use:

```text
HTML5
CSS3
Vanilla JavaScript
```

---

# 6.3 PROJECT CONCEPT

The task does not prescribe one specific business domain.

Create a simple, coherent web application/interface rather than a random
collection of UI components.

The interface should have:

* Header
* Navigation
* Main content
* Content sections/cards
* Interactive element(s)
* Footer

Choose a simple concept that allows responsive frontend skills to be
demonstrated clearly.

Do not build unnecessary application complexity.

---

# 6.4 RESPONSIVE REQUIREMENT

The interface MUST work across:

```text
Mobile
Tablet
Desktop
```

The design must follow a mobile-first strategy.

Start with:

```text
single-column mobile layout
```

Then expand the layout for larger screens.

---

# 6.5 RESPONSIVE BREAKPOINTS

Use the instructional guidance:

```text
Tablet: approximately 768px
Desktop: approximately 1024px
```

Use media queries to progressively enhance the layout.

Do not design desktop first and simply shrink it down.

---

# 6.6 CSS GRID

Use CSS Grid for macro page layout where appropriate.

Example architectural concept:

```text
Header
-------------------------
Sidebar | Main Content
-------------------------
Footer
```

Grid should be used where it provides a clear page-level layout structure.

---

# 6.7 FLEXBOX

Use Flexbox for smaller component-level layouts.

Examples:

* Navigation links
* Buttons
* Card content
* Icon/text alignment
* Header controls

Do not use Grid and Flexbox randomly.

Use each where it makes architectural sense.

---

# 6.8 FLUID TYPOGRAPHY

Use CSS `clamp()` where appropriate for fluid typography.

Example concept:

```css
font-size: clamp(...);
```

Do not use excessive fixed font sizes.

---

# 6.9 SEMANTIC HTML

Use semantic HTML5 elements.

Prefer:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

over unnecessary `<div>` elements.

Semantic structure must communicate the meaning of the page.

---

# 6.10 ACCESSIBILITY

The interface must be accessible.

Implement:

* Proper heading hierarchy
* Semantic HTML
* Accessible navigation
* Meaningful link text
* Accessible buttons
* Form labels if forms exist
* Keyboard-friendly interactions
* Visible focus states
* Appropriate `alt` text
* Sufficient color contrast
* Avoid color-only communication

Do not use inaccessible custom UI when native HTML can solve the problem.

---

# 6.11 DESIGN PROCESS

The DecodeLabs material describes a design workflow involving:

```text
Discovery
↓
Research / Empathy Map
↓
Wireframe
↓
Semantic HTML
↓
Visual Style
↓
Interaction Logic
↓
Accessibility Audit
```

Create lightweight documentation for the design process.

Recommended:

```text
docs/
├── discovery.md
├── empathy-map.md
└── wireframe.md
```

These do not need to be enormous documents.

They should demonstrate that the interface was intentionally designed.

---

# 6.12 WIREFRAME

Create a simple low-fidelity wireframe before implementation.

The wireframe should show:

```text
Header
Navigation
Hero/Main Content
Content Area
Cards/Sections
Footer
```

Focus on:

* Hierarchy
* Spacing
* Flow
* Mobile-first structure

Do not rely on colors to make a bad layout look good.

---

# 6.13 VISUAL DESIGN

The provided DecodeLabs material specifies a warm and grounded visual direction.

Suggested palette:

```text
Mocha Mousse
#A68E7A

Ethereal Blue
#A0D4E0

Moonlit Grey
#F2F0EA
```

Use these as design guidance.

Do not blindly apply every color everywhere.

The final interface should be:

* Warm
* Grounded
* Clean
* Professional
* Readable
* Modern

---

# 6.14 TYPOGRAPHY

The provided design guidance recommends:

Headings:

```text
Montserrat
or
Inter
```

Body:

```text
Roboto
or
Open Sans
```

Constraint:

```text
Maximum 2 font families
Maximum 3 font weights
```

Respect these constraints.

---

# 6.15 JAVASCRIPT

Use vanilla JavaScript for basic interaction.

At least one meaningful interactive behavior should exist.

Examples:

* Mobile navigation toggle
* Button interaction
* FAQ expansion
* Simple form validation
* Theme/state interaction

Do not add JavaScript merely for decoration.

---

# 6.16 FULL STACK P1 FILE STRUCTURE

Recommended:

```text
Project-1-Responsive-Frontend/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── ...
├── docs/
│   ├── discovery.md
│   ├── empathy-map.md
│   └── wireframe.md
├── README.md
└── .gitignore
```

---

# 6.17 FULL STACK P1 RESPONSIVE TESTING

Test at minimum:

```text
Mobile width
Tablet width
Desktop width
```

Check:

* Navigation
* Typography
* Images
* Cards
* Spacing
* Buttons
* Overflow
* Horizontal scrolling
* Footer
* Interactive elements

There must be no accidental horizontal overflow.

---

# 6.18 FULL STACK P1 ACCEPTANCE CRITERIA

* [ ] Uses HTML5.
* [ ] Uses CSS3.
* [ ] Uses vanilla JavaScript.
* [ ] No frontend framework.
* [ ] Mobile-first design.
* [ ] Responsive on mobile.
* [ ] Responsive on tablet.
* [ ] Responsive on desktop.
* [ ] CSS Grid used appropriately.
* [ ] Flexbox used appropriately.
* [ ] Semantic HTML5 elements used.
* [ ] Fluid typography used where appropriate.
* [ ] Navigation works.
* [ ] At least one meaningful JS interaction exists.
* [ ] Keyboard interaction works.
* [ ] Focus states are visible.
* [ ] Images have appropriate alt text.
* [ ] No horizontal overflow.
* [ ] UI is clean and readable.
* [ ] Design documentation exists.
* [ ] README exists.

---

# 7. FULL STACK DEVELOPMENT — PROJECT 2

# Backend API Development

## 7.1 OBJECTIVE

Develop a simple backend API that handles application logic.

The API must demonstrate:

* Backend development
* Server-side logic
* API concepts
* HTTP methods
* User input
* Responses
* Basic validation
* Error handling

---

# 7.2 CORE REQUIREMENTS

The API MUST include:

```text
GET endpoint
POST endpoint
```

The API must:

* Accept requests.
* Process input.
* Return responses.
* Validate basic data.
* Handle invalid requests gracefully.

---

# 7.3 RESOURCE DESIGN

Use a simple resource.

Recommended:

```text
users
```

or another simple resource if the repository already has a clear domain.

For example:

```text
GET  /api/users
POST /api/users
```

Use REST-style resource naming.

Do NOT use action-based routes such as:

```text
GET /getUsers
POST /createUser
```

Prefer nouns/resources.

---

# 7.4 JSON

Use JSON for request and response bodies.

Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Responses should have predictable structures.

---

# 7.5 GET ENDPOINT

Implement a GET endpoint that retrieves data.

Example:

```text
GET /api/users
```

Expected behavior:

```text
200 OK
```

with JSON data.

Example:

```json
{
  "success": true,
  "data": []
}
```

---

# 7.6 POST ENDPOINT

Implement a POST endpoint that accepts user input.

Example:

```text
POST /api/users
```

Example body:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

The server must validate the incoming data.

---

# 7.7 VALIDATION

At minimum validate:

* Required fields
* Correct basic data types
* Non-empty values
* Basic email format if email is used

Invalid input must not silently succeed.

Example:

```text
400 Bad Request
```

with a useful JSON response.

---

# 7.8 NEVER TRUST THE CLIENT

Validation must happen on the server.

Do not assume that data sent by the frontend/client is valid.

Perform server-side validation even if a frontend eventually validates the same
data.

---

# 7.9 HTTP STATUS CODES

Use appropriate HTTP status codes.

At minimum understand/use:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

For POST creation:

```text
201 Created
```

is preferred on successful creation.

For malformed/invalid client input:

```text
400 Bad Request
```

For missing resources:

```text
404 Not Found
```

Unexpected server failures:

```text
500 Internal Server Error
```

Do not return `200 OK` for every situation.

---

# 7.10 RESPONSE STRUCTURE

Use consistent JSON response structures.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "message": "Invalid input"
  }
}
```

The exact structure may be adjusted if an existing project convention exists,
but consistency is required.

---

# 7.11 DATA STORAGE

The official core requirement does NOT require a database.

Therefore:

Do NOT add MongoDB/PostgreSQL/MySQL unless needed by the existing project or
explicitly required by a future task.

For this milestone, an in-memory array/list is acceptable.

Example conceptual structure:

```text
users = []
```

The goal is to demonstrate API logic rather than database engineering.

---

# 7.12 AUTHENTICATION

Authentication is NOT a core requirement for this task.

Do not add JWT/session authentication unless:

* Existing project architecture already requires it, or
* A future official task explicitly requires it.

---

# 7.13 SECURITY

Implement basic safe practices:

* Validate request bodies.
* Do not trust client input.
* Do not expose stack traces in production-style responses.
* Do not commit secrets.
* Keep configuration separate.
* Return safe error messages.

---

# 7.14 ERROR HANDLING

The API must handle:

```text
Invalid JSON
Missing fields
Invalid fields
Unknown routes
Unexpected server errors
```

where applicable.

The server must not crash because a normal client sends invalid input.

---

# 7.15 FULL STACK P2 ARCHITECTURE

Keep the architecture simple.

Recommended:

```text
Request
   ↓
Route
   ↓
Validation
   ↓
Controller/Handler
   ↓
Application Logic
   ↓
Response
```

Do not create unnecessary microservices for this task.

---

# 7.16 TECHNOLOGY CHOICE

The task PDF does not prescribe a specific backend language/framework.

Implementation preference:

1. Preserve the repository's existing backend stack if one exists.
2. If no backend exists, use a simple and well-supported backend stack.
3. Node.js + Express is an acceptable implementation choice.
4. Do not introduce a large framework unless necessary.

---

# 7.17 API DOCUMENTATION

The project must document:

```text
Endpoint
HTTP method
Purpose
Request body
Request parameters
Successful response
Error responses
Example requests
Example responses
```

A simple `API.md` may be created.

Example:

```text
GET /api/users
POST /api/users
```

---

# 7.18 API TESTING

Test all required endpoints.

At minimum test:

### GET

```text
Successful request
Empty data
```

### POST

```text
Valid request
Missing required field
Invalid field
Malformed input
```

### Routing

```text
Unknown endpoint
```

Verify HTTP status codes.

---

# 7.19 FULL STACK P2 FILE STRUCTURE

Recommended:

```text
Project-2-Backend-API/
│
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── validation/
│   └── app.js
│
├── tests/
├── API.md
├── README.md
├── package.json
├── .env.example
└── .gitignore
```

If the project is simple enough, do not create empty architectural layers
just for appearance.

Use only directories that contain meaningful code.

---

# 7.20 FULL STACK P2 README

README must contain:

```text
Project Title
Objective
Features
Technology Stack
Architecture
API Endpoints
Request Examples
Response Examples
Validation Rules
HTTP Status Codes
How to Install
How to Run
How to Test
Project Structure
Future Improvements
```

---

# 7.21 FULL STACK P2 ACCEPTANCE CRITERIA

* [ ] Backend starts successfully.
* [ ] GET endpoint exists.
* [ ] POST endpoint exists.
* [ ] GET returns JSON.
* [ ] POST accepts JSON.
* [ ] Server validates input.
* [ ] Invalid input returns an appropriate error.
* [ ] Successful creation returns appropriate status.
* [ ] Unknown route returns appropriate status.
* [ ] Errors do not crash the server.
* [ ] REST-style resource naming is used.
* [ ] API documentation exists.
* [ ] README exists.
* [ ] Tests or manual API verification are documented.
* [ ] No secrets are committed.

---

# 8. CROSS-PROJECT DOCUMENTATION REQUIREMENTS

Every project must contain a useful README.

At minimum:

```text
Project title
Description
Objective
Features
Technology
Installation
How to run
Usage
Examples
Project structure
Testing
Future improvements
```

Do not create generic placeholder READMEs.

Documentation must describe the actual implementation.

---

# 9. GITHUB REQUIREMENTS

The repository must be prepared for public GitHub submission.

Before considering the work complete:

* Ensure source code exists.
* Ensure README exists.
* Ensure setup instructions work.
* Ensure project runs.
* Remove unnecessary temporary files.
* Do not commit secrets.
* Do not commit `.env`.
* Include `.env.example` where environment variables are required.
* Keep repository structure understandable.

The repository URL is:

```text
GITHUB_REPOSITORY_URL="<PUT_GITHUB_REPOSITORY_URL_HERE>"
```

---

# 10. SECURITY / SECRET MANAGEMENT

Never commit:

```text
.env
API keys
Passwords
Tokens
Private keys
Database credentials
Authentication secrets
```

Use:

```text
.env.example
```

for documenting required variables.

---

# 11. CODE QUALITY

All projects must prioritize:

* Readability
* Simplicity
* Correctness
* Maintainability
* Meaningful names
* Small reusable functions
* Clear comments only where useful
* No unnecessary duplication

Avoid:

* Dead code
* Unused imports
* Unused dependencies
* Giant functions
* Giant files
* Hardcoded secrets
* Copy-pasted logic

---

# 12. TESTING REQUIREMENT

Before marking any project complete, run the project from a clean state.

For each project:

```text
1. Install dependencies
2. Start/run project
3. Exercise core functionality
4. Test expected behavior
5. Test invalid input
6. Fix errors
7. Run again
8. Verify README instructions
```

Do not claim a project is complete without actually testing it.

---

# 13. FINAL PROJECT CHECKLIST

The agent must maintain a checklist.

## AI P1

* [ ] Rule-based chatbot
* [ ] Continuous loop
* [ ] Input sanitization
* [ ] Dictionary knowledge base
* [ ] 5+ intents
* [ ] Greeting handling
* [ ] Exit handling
* [ ] Fallback
* [ ] README
* [ ] Tested

## AI P2

* [ ] Iris dataset
* [ ] 150 samples / 3 classes / 4 features understood
* [ ] Feature/target separation
* [ ] StandardScaler
* [ ] Train/test split
* [ ] KNN
* [ ] n_neighbors=5
* [ ] Predictions
* [ ] Accuracy
* [ ] Confusion matrix
* [ ] F1 score
* [ ] README
* [ ] Tested

## Full Stack P1

* [ ] HTML5
* [ ] CSS3
* [ ] Vanilla JavaScript
* [ ] No frontend framework
* [ ] Semantic HTML
* [ ] Mobile-first
* [ ] Responsive mobile
* [ ] Responsive tablet
* [ ] Responsive desktop
* [ ] CSS Grid
* [ ] Flexbox
* [ ] clamp() where appropriate
* [ ] Accessibility
* [ ] JavaScript interaction
* [ ] Design documentation
* [ ] README
* [ ] Tested

## Full Stack P2

* [ ] Backend server
* [ ] GET endpoint
* [ ] POST endpoint
* [ ] JSON
* [ ] Input handling
* [ ] Server-side validation
* [ ] Error handling
* [ ] Appropriate HTTP status codes
* [ ] REST-style naming
* [ ] API documentation
* [ ] README
* [ ] Tested

---

# 14. FUTURE TASK EXTENSION SYSTEM

This PRD WILL be extended when additional DecodeLabs tasks are provided.

Possible future additions:

```text
AI Project 3
AI Project 4

Full Stack Project 3
Full Stack Project 4

Data Analytics Project 1
Data Analytics Project 2
...

Other domains
```

When new task information is provided:

1. Read the new task PDF/message completely.
2. Extract the exact requirements.
3. Add a new section to this PRD.
4. Do not delete previous project requirements.
5. Do not silently modify completed projects.
6. Identify conflicts between old and new requirements.
7. Prefer the latest official task when requirements explicitly supersede
   earlier instructions.
8. Keep every project independently runnable where practical.
9. Update the project matrix.
10. Update the global completion checklist.

---

# 15. FUTURE TASK TEMPLATE

When adding a new project, use this structure:

```text
# X. TRACK — PROJECT N

# Project Name

## Objective

## Official Requirements

## Functional Requirements

## Technical Requirements

## Required Workflow

## UI Requirements

## Backend Requirements

## Data Requirements

## Validation

## Error Handling

## Security

## Documentation

## Testing

## File Structure

## Acceptance Criteria
```

Do not fill unknown requirements with guesses.

Use:

```text
TBD — Awaiting official DecodeLabs task instructions.
```

when information has not yet been provided.

---

# 16. REQUIREMENT PRIORITY

Use these priority levels:

## P0 — Mandatory

The project cannot be considered complete without it.

Examples:

```text
AI P1 continuous loop
AI P1 dictionary
AI P2 KNN
AI P2 train/test split
FS P1 HTML/CSS/JS
FS P1 responsiveness
FS P2 GET
FS P2 POST
FS P2 validation
```

## P1 — Strongly expected

Implement unless there is a clear technical reason not to.

Examples:

```text
README
Testing
Accessibility
Error handling
API documentation
```

## P2 — Optional / Enhancement

Only implement when it improves the project without creating unnecessary
complexity.

Examples:

```text
Additional visualizations
Extra chatbot intents
Extra API tests
Extra UI polish
```

---

# 17. WHAT NOT TO DO

Do NOT:

* Build all four projects as one application.
* Use React for Full Stack P1.
* Use Tailwind for Full Stack P1.
* Use Bootstrap for Full Stack P1.
* Use an LLM for AI P1.
* Replace the AI P2 KNN requirement with a neural network.
* Skip feature scaling for AI P2.
* Test the model on training data and call it final evaluation.
* Add a database to FS P2 without a reason.
* Add authentication without a requirement.
* Build microservices for FS P2.
* Add unnecessary dependencies.
* Hardcode secrets.
* Create fake test results.
* Claim that something was tested when it was not.
* Create placeholder documentation and call it complete.
* Ignore responsive behavior.
* Ignore accessibility.
* Overcomplicate beginner-level tasks.

---

# 18. DEFINITION OF DONE

A project is DONE only when all of the following are true:

```text
Requirements implemented
        ↓
Code reviewed
        ↓
Project runs
        ↓
Core functionality tested
        ↓
Invalid/error cases tested
        ↓
Documentation written
        ↓
README verified
        ↓
No secrets exposed
        ↓
GitHub-ready
        ↓
Acceptance checklist complete
```

The agent must not report completion if mandatory acceptance criteria remain
unchecked.

---

# 19. FINAL AGENT BEHAVIOR

When starting implementation:

1. Inspect the repository.
2. Read this PRD.
3. Determine which projects are currently available.
4. Determine what has already been implemented.
5. Implement missing requirements.
6. Do not destroy completed work.
7. Test every implemented project.
8. Update documentation.
9. Update checklists.
10. Report exactly what was implemented and tested.

When a future DecodeLabs task is supplied, extend this PRD and continue from
the existing project state.

The objective is to gradually build a complete, professional DecodeLabs
internship portfolio while keeping every internship milestone faithful to
its official task requirements.

---

# END OF CURRENT PRD

```

### A couple of important decisions I made

I deliberately **did not tell the agent to build a huge application** around these tasks. For example, Full Stack P2's later slides discuss authentication, authorization, gateway architecture, microservices, resilience, etc., but the actual project requirement is the simpler backend API milestone. The PRD therefore tells the agent to learn from those architectural principles without turning the internship task into an unnecessarily large production system. :contentReference[oaicite:6]{index=6}

Likewise, AI P1's later material discusses hybrid architectures and LLMs, but the actual Project 1 specification is the deterministic rule-based chatbot with a continuous loop, sanitization, dictionary with **5+ intents**, fallback, and exit strategy. So the PRD explicitly prevents the coding agent from incorrectly adding an LLM. :contentReference[oaicite:7]{index=7}

And for AI P2, the PDF is actually more specific than the short requirements page: it points to the **Iris dataset → feature scaling → train/test split → KNN → confusion matrix/F1** pipeline. :contentReference[oaicite:8]{index=8}
