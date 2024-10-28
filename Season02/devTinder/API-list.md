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
    status can be [interested,ignored]

-   POST /request/review/:status/:userId
    status can be [accepted,rejected]

userRouter

-   GET /user/connections
-   GET /user/requests
-   GET /user/feed
