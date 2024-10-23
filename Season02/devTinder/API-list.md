# DevTinder API list

authRouter

-   POST /signup
-   POST /login
-   POST /logout

profileRouter

-   GET /profile/view
-   PATCH /profile/edit
-   PATCH /profile/password

connectionRequestRouter

-   POST /request/send/:status/:userId

-   POST /request/review/accepted/:userId
-   POST /request/review/rejected/:userId

userRouter

-   GET /user/connections
-   GET /user/requests
-   GET /user/feed
