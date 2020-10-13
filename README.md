# GA Project 1: Poké Pac-Man

## Table of Contents

- [Overview](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#f99c1c68a0be411ea21aebfba620afdd),
- [Technologies](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#c4e06631a3be4fceb9e534a52290e05d),
- [Planning](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#fe3af2ac0fd944c98a0bad3a79ddff88),
- [Getting Started](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#99b60c701ae0446998be70811a2726d1),
- [Wins](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#81e74b7a4ae74f2399c85b5ed0c61304),
- [Challenges](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#7fedc5eb0935405e992e4910a4d6d3a7),
- [Future Work](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#fca88914eeb14fc0909ad0588d7ea20c),

## Overview

### Brief

- **Solo project**,
- **1 week timeframe**,
- **Make a game** chosen from a preset list using **HTML, CSS & Vanilla JavaScript only**,
- **Player is able to 'Win' & 'Lose'** the game,
- **Be deployed online** so it's publicly accessible,

As part of my 1st project at GA's SEI Bootcamp, I created a Pokémon themed parody of the classic Pac-Man game in 1 week. The retro design of the UI was inspired by the original GameBoy (albeit with a bit of accidental luck).

![Gameboy interface screenshot](/ReadmeResources/GameScreenshot.png)

This project was made with HTML5, CSS3 and Vanilla JavaScript where the most challenging yet most rewarding part was figuring out how to apply logic to the 'Ghost' movements in which they are 'chasing' the 'Player'.

![Working Gif of Poke Pac-Man](/ReadmeResources/PokePacMan-GIF.gif)

## Technologies

- HTML5,
- CSS3,
- JavaScript,
- GitHub,

## Planning

- Grid size = 29 x 29 and geometry (i.e. Ghost lair, walls, food and Rare Candy locations),
- Use element 'class' to determine whether object is walls, food, candy, ghost etc,

### MVP

- Ability for 'Player' to 'Win' or 'Lose',
- 'Player' and 'Ghost' able to move only within the confines of the grid (i.e. cannot move through 'walls'),
- 'Ghost' movement is random,
- 'Player' is able to 'hunt' 'Ghost' after eating/acquiring a Rare Candy,
- Score functionality,

## Getting Started

In order to enjoy the full experience of the application, it is recommended to use the deployed version at [https://tams2429.github.io/GA-Project-1/](https://tams2429.github.io/GA-Project-1/). If you wish to run it locally, you will need to follow the following steps:

- Fork or Clone the GitHub repository ([https://github.com/tams2429/GA-Project-1](https://github.com/tams2429/GA-Project-1)),
- Right click the `index.html` file and select the **'open in default browser'** to start the development server,

## Wins

The biggest win by far, was being able to implement logic for the 'Ghost' movement, where they were gradually moving closer to the 'Player' when they were hunting, and the opposite when the 'Ghost' were being hunted.

## Challenges

One of the challenges in this project was to ensure the 'Player' and the 'Ghosts' move within the defined grid (i.e. within the barriers). This was achieved by a simple 'if' statement which checks whether the next element that the character is moving towards, contains a class of 'barrier'.

## Future Work

### Bugs

- Pokemon (i.e. Player) evolution animation via eating the Rare Candy, repeats everytime a Rare Candy is eaten regardless of whether the Pokemon has already evolved or not,
    - To solve this, could add conditional statements that only trigger evolution (i.e. change of 'classes'), if the current 'class' of the Pokemon has not changed due to evolution,
- When 'Player' chooses to replay the game, the page refreshes and the 'Player' has to rewatch the intro. video before game resets as opposed to the game resetting without page refresh,

### Planned features/extensions

- A high-score leaderboard,
    - Use a conditional 'if' statement to check whether current score is larger than the previous score, if true, reassign high score with current score,
- Increasing levels of difficulties upon level completion,
    - Higher speed of 'Player'/'Ghost' movement ⇒ Harder difficulty,
- Responsive design,
- Ability to choose different 'Player' avatars,
- Board theme variability,
