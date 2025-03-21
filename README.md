# Knitflix

Welcome to Knitflix! A single-page movie application built using React. It's based on its existing server-side code Myflix. Users can browse movies movies, mark their favorites and manage their profiles.\

## Description

This SPA:
* Uses state routing to navigate between views adn share URLs
* Written using React library and Bootstrap for styling and responsiveness
* Contains function components
* Hosted online using Netlify
* Uses Parcel as its build tool

## Features

* Signup view - allows users to register
* Login view - allows user to log in with a username and password
* Main view - returns all movies with an image and tile.
* Single move view - returns a single movie showing the title, description and director
* Profile view - shows user's profile, displays favorite movies and also allows the user to deregister

## Setup:

### Pre-requisites

Node.js npm (Node Package Manager)

### Installation
1. Clone the repository `https://github.com/KamilaKnits/MyFlix-client.git`
3. Install dependencies with npm:
   
   * Parcel (dev):
     
          `npm install -g parcel`

   * React :
   
         `npm install --save react react-dom`

## API 

This application connnects to an external API for the movie data [MyFlix](https://github.com/KamilaKnits/MyFlix.git).
