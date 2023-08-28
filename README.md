# oscode-website-backend

## User Registration

- ### Endpoint: POST /oscode/api/users/signup
**Functionality:** Allows users to register by providing necessary information like username, email, password, etc. This endpoint will likely validate the input data and create a new user account in your system.
User Login

- ### Endpoint: POST /oscode/api/users/signin
**Functionality:** Handles user authentication. Users provide their credentials (username/email and password) to log in. The API will verify the credentials and provide an authentication token or session to use for subsequent authenticated requests.
Get User Profile

- ### Endpoint: GET /oscode/api/users/profile
**Functionality:** Retrieves the profile information of the authenticated user. This endpoint is likely protected and requires authentication. Once the user is authenticated, their profile data can be fetched and returned as a response.
Edit User Profile

- ### Endpoint: PATCH /oscode/api/users/:id/edit
**Functionality:** Allows users to update their profile information. This endpoint typically requires authentication to ensure that only the owner of the profile can modify the data. The :id parameter in the URL indicates which user's profile is being edited.
Delete User Account

- ### Endpoint: DELETE /oscode/api/users/:id/delete
**Functionality:** Enables users to delete their account permanently. Like the previous endpoint, this requires authentication to prevent unauthorized deletion of accounts. The :id parameter specifies the user account to be deleted.
User Logout

- ### Endpoint: GET /oscode/api/users/logout
**Functionality:** Handles user logout and ending their session. This could involve invalidating the authentication token or session on the server, ensuring the user needs to log in again to access protected resources
