- /v1/video

GET - Retrieve all videos (Leaderboard) **Visitor** **Admin**

POST - upload a video **Participant**

PUT - 

DELETE - 

- /v1/video/*id*

GET - Retrieve specific video **Visitor** **Admin**

POST - 

PUT - Admin Approve, upvote on video **Visitor** **Admin**

DELETE - delete specific video **Admin**

- /v1/video/*id*/comment

GET - Retieve all comments related to video (thread) **Visitor** **Admin**

POST - Upload comment to that video **Visitor**

PUT - Update comment status related to approving whole thread **Admin**

DELETE - Delete whole thread **Admin**

- /v1/video/*id*/comment/*id*

GET - Retrieve specific comment **Admin**

POST - 

PUT - Update comment status **Admin**

DELETE - Delete comment **Admin**


- /v1/competition

GET - Retrieve all competitions info **Admin**

POST - Create new competition **Admin**

PUT - 

DELETE - 

- /v1/competition/*id*

GET - Specific competition info **Admin**

POST - 

PUT - Update competition info **Admin**

DELETE -

- /v1/topTen

GET - Retieve Top 10 List of Videos **Admin**

POST - 

PUT - Update Top 10 List **Admin**

DELETE -

- /v1/login

- /v1/logout