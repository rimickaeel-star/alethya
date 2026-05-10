#!/bin/bash
echo "🚀 Starting to upload your project to GitHub..."

# Remove any old remote configurations
git remote remove origin 2>/dev/null

# Add your correct repository URL
git remote add origin https://github.com/rimickaeel-star/alethya.git

# Set the primary branch to main
git branch -M main

echo "📦 Pushing files to https://github.com/rimickaeel-star/alethya.git..."
echo "Note: If prompted, please enter your GitHub username and password/token."
echo "----------------------------------------------------------------------"

# Run the push command
git push -u origin main

if [ $? -eq 0 ]; then
    echo "----------------------------------------------------------------------"
    echo "🎉 SUCCESS! Your project has been successfully uploaded to GitHub."
    echo "You can now return to Vercel and import the project!"
else
    echo "----------------------------------------------------------------------"
    echo "❌ Push failed. Please make sure your terminal is interactive or try logging in to GitHub in your editor."
fi
