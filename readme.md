## Cookie Clicker ##
[Play now!](https://yasserb94.github.io/CookieClicker/);

This project came to be as a 2 day [BeCode](https://becode.org) assignment to improve my JavaScript ES6 skills,learn about incremental games/js features and have some creative fun!

Due to the challenge I will focus on making this game work on a desktop computer, improving the UI responsiveness for mobile will be one of the last stretchgoals.
Making the game work and have some fun features will be my priority.
### Goals ###
- [X] Have a basic site that houses the game
- [x] Have a clickable cookie and a visible score/credit count
- [x] Have a store with upgrades
  - [x] Make upgrades cost points
  - [X] Have a passive income upgrade
    - [X] In form of staff
    - [ ] In form of interest
  - [x] Make upgrades upgradeable with increased cost
  - [x] Have an upgrade that increases cookies gained per click for a set amount of time
  - [x] You can't buy upgrades if you can't afford them
- [ ] Make it pretty
#### Stretch Goals ####
- [ ] Add a bloglike page to the site that has a roadmap of how the game came to be
- [ ] Add an about/contact page
- [ ] Use acutal cookies(?) to keep player's score stored
- [ ] Make the site responsive
- [X] Implement Upgrade ideas
#### Roadmap ####
- [X] Have a design for the website
  - [X] Have a cookie friendly color palette
    - [X] Primary Color             <span style="color:#E84855">Color: **#E84855**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/red.png)
    - [X] Secondary Color           <span style="color:#6C91C2">Color: **#6C91C2**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/blue.png)
    - [X] Accent/Highlight Color    <span style="color:#7DCD85">Color: **#7DCD85**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/greenLight.png)
    - [X] Dark Background Color     <span style="color:#14281D">Color: **#14281D**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/greenDark.png)
    - [X] Replacement for black     <span style="color:#071013">Color: **#071013**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/black.png)
    - [X] Replacement for white     <span style="color:#EDE3E4">Color: **#EDE3E4**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/white.png)
    - [X] Dark Cookie Color         <span style="color:#4D1607">Color: **#4D1607**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/brownDark.png)
    - [X] Light Cookie Color        <span style="color:#DCAA6A">Color: **#DCAA6A**</span>
                        - ![colorPalettePreview](assets/ReadMeImages/Colors/brownLight.png)
  - [X] Have a sketch for the home-page that houses the game

![homepage game sketch](assets/ReadMeImages/sketch-for-gamepage.webp)

- [X] Create the design in html and css

![site template in html and css](assets/ReadMeImages/site-template.png)

- [X] Create the base site layout in html/css
- [X] Create the game section
- [X] Add a cookie to it's game panel
- [X] Add a cookie click counter to it's game panel

![State of gamesection when starting js logic](assets/ReadMeImages/UI-starting-logic.png)

- [X] JS logic of the clicker
  - [X] Implement a game update loop to prepare for logic
    - [X] Ask the browser when it can update the game
    - [X] Configure the game to update once/second
	can be modified with a variable: FPS
    - [X] Seperate update to logic from UI update
	split in two functions: update() and draw()
  - [X] Make the cookie clickable
    - [X] Add a counter to count amount of cookies baked
- [X] Add logic to sell shop cookies and convert to credits
  - [X] set cookieprice and sell a cookie every x random seconds
  - [ ] implement upgrade to get more money per cookie sold
  - [X] implement upgrade to sell cookies faster
- [x] Display values in a panel

![Game panel showing cookies clicked, credits and cookies in shop](assets/ReadMeImages/statsPanel.png)

- [X] Add some sort of multiplier
  - [X] Add oven option to upgrade-shop pane
  - [X] Add oven level indicator to upgrade-stats pane
  - [X] Add price to oven upgrade
  - [X] Make cookie clicker increase cookies per click based on oven level

![Oven upgrade icon](/assets/ReadMeImages/oven-upgrade.png)

- [X] Add Economics upgrade
  - [X] Sell more cookies at a time
  - [X] Added extra check to make sure there are enough cookies

![Eco upgrade icon](/assets/ReadMeImages/eco-upgrade.png)

- [X] Add a Find Staff upgrade
  - [X] Have random staff members with random skills and moobs
  - [X] Generate new staff if staff members run low
  - [X] Have a x chance to hire a staff member
  - [X] Increase hiring chance dependent on investment 
  - [X] Let staff members bake cookies
  - [X] Add cookies baked/min by staff to info
  - [x] Have funny names for newly generated staff

![Find staff](/assets/ReadMeImages/find-staff.png)

- [X] Add Cookie Quality Upgrade
  - [X] Earn tips, the user has a small chance to gain an extra credit/cookie sold
  - [X] Tip chance gets increased if the cookie's recipe is upgraded

![Improve recipe](/assets/ReadMeImages/improve-recipe.png)
- [X] Rent an extra oven!
  - [X] Staff members will use the upgraded oven instead of their own
  - [X] The oven can be rented for a set amount of time
  - [X] Price for renting depends on the amount of staff members in the shop

![Rent Oven](/assets/ReadMeImages/rent-oven.png)

- [X] Make Staff sell cookies
  - [x] Staff will sell cookies isntead of baking
  - [x] Add a new characteristic to staff members that determines how many cookies they sell/loop
  - [x] the more money the user has the more money the staff wants to start baking again

![Staff Changes jobs](/assets/ReadMeImages/change-jobs.png)

- [X] Have panes explaining the game and upgrades to new players
- [x] Have some juicy stats
- [x] Have indicators for the staffs current job and the oven boost

![info panels](/assets/ReadMeImages/infopanes.png)