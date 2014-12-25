
#!/bin/bash

NEW_AUTHOR_NAME="masonhassan1"
NEW_AUTHOR_EMAIL="masonhassan397@gmail.com"
START_DATE="2014-12-25 12:00:00"

# Determine the date command options based on the OS
current_timestamp=$(date -d "$START_DATE" +%s)


# Export the variables so they are available in the filter-branch environment
export NEW_AUTHOR_NAME NEW_AUTHOR_EMAIL current_timestamp

# Go through each commit and update the date and author/committer information
git filter-branch -f --env-filter '

    # Get the current timestamp and add a pseudo-random increment to it
    current_timestamp=$(($current_timestamp + RANDOM % 10 * 86400 + RANDOM % 24 * 3600 + RANDOM % 60 * 60 + RANDOM % 60))
    
    # Format the new date based on the OS
    new_date=$(date -d "@$current_timestamp" +"%Y-%m-%d %H:%M:%S")
    export GIT_COMMITTER_DATE="$new_date"
    export GIT_AUTHOR_DATE="$new_date"
    export GIT_AUTHOR_NAME="$NEW_AUTHOR_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_AUTHOR_EMAIL"
    export GIT_COMMITTER_NAME="$NEW_AUTHOR_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_AUTHOR_EMAIL"

' --tag-name-filter cat -- --all

echo "All commit dates and author details have been updated."
