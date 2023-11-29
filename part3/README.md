# Set a MONGODB_URI env variable to access to the cloud MongoDB
# To deploy project
    fly deploy -a phonebook-gmm
# To opne the deployed app on the browser
    fly open
# To set fly environment variable
    fly secrest set MONGODB_URI='mongodb+srv://gonzalomedinamedina:${password}@phonebook.6zqewjh.mongodb.net/?retryWrites=true&w=majority'