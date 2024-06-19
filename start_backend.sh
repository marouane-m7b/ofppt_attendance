#!/bin/bash

# Function to run commands in a new Git Bash window
function run_in_new_git_bash {
    local COMMAND=$1
    local TITLE=$2

    # Create a temporary batch script to run the commands
    TEMP_FILE=$(mktemp).sh
    echo "#!/bin/bash" > "$TEMP_FILE"
    echo "$COMMAND" >> "$TEMP_FILE"
    chmod +x "$TEMP_FILE"

    # Run the temporary script in a new Git Bash window
    winpty /usr/bin/bash --login -i -c "$TEMP_FILE"

    # Clean up the temporary file
    rm "$TEMP_FILE"
}

# Path to Git Bash executable (update if necessary)
GIT_BASH_PATH="/usr/bin/bash.exe"

# Navigate to back-end and start Laravel server
run_in_new_git_bash "cd back-end && php artisan serve" "Laravel Server"

