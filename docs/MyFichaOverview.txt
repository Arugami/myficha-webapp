# **MyFicha**: Immersive Cuban Dominoes Experience

**"My Ficha"** is a beautifully crafted web app that celebrates Cuban culture through the authentic experience of playing dominoes. Designed with competitive mechanics, social features, and cultural flair, it captures the essence of Cuban domino games while delivering a modern, smooth gameplay experience.

This app is more than a game—it’s a celebration of Cuban culture and community. From the artful design, rooted in Calle Ocho's essence, to the thoughtful multiplayer features that encourage teamwork and camaraderie, this app will feel like sitting in a park in Havana with friends, domino tiles in hand.

---

## **Executive Summary**

- **Project Name:** MyFicha  
- **Tagline:** Immersive Cuban Dominoes Experience  
- **Primary Goal:** Build a culturally rich, competitive Cuban Dominoes platform that bridges casual fun and strategic depth, rooted in authenticity and community.  
- **Target Audience:** Domino enthusiasts (casual players, competitive strategists, Cuban diaspora, and global gamers).  

---

## **Screen/Page Breakdown for MyFicha**

### **1. Login/Signup Screen**
- **Purpose:** User authentication and onboarding.  
- **Key Elements:**  
  - OAuth buttons (Google, Facebook) + guest play option.  
  - Email/password signup with validation.  
  - Password recovery link.  
  - Brief tagline: *“Play Cuban Dominoes like never before.”*  

---

### **2. Dashboard/Home Screen**
- **Purpose:** Central hub for navigation and quick actions.  
- **Key Elements:**  
  - **Quick Play Button:** 1v1/2v2 with default settings.  
  - **Recent Matches:** Thumbnails of last 3 games (scores, participants).  
  - **Leaderboard Teaser:** Top 3 players/teams.  
  - **Notifications:** Match invites, CDS updates.  
  - **Navigation Menu:** Profile, Play, History, Leaderboard, Settings.  

---

### **3. Profile Screen**
- **Purpose:** User customization and stat tracking.  
- **Key Elements:**  
  - **Avatar Customization:** Pre-loaded Cuban icons (flags, cars) + username edit.  
  - **Stats Tabs:**  
    - *Basic:* Wins, streaks, Pollonas/Viajeras.  
    - *Advanced (toggleable):* Tile efficiency, bluff success.  
  - **Settings:**  
    - Dark Mode toggle.  
    - Language (English/Spanish).  
  - **Logout Button.**  

---

### **4. Play Game Screen**
- **Purpose:** Match type selection and setup.  
- **Key Elements:**  
  - **Mode Selector:** 1v1 / 2v2 toggle.  
  - **Session Length:** Default (150 points) or *“Domino-Out”* (short).  
  - **Match Type:**  
    - Quick Play (automated matchmaking).  
    - Private Match (generate/join room code).  
    - Friend Match (invite from friend list).  
  - **Start/Cancel Buttons.**  

---

### **5. Private Match Setup Screen**
- **Purpose:** Create or join a private game.  
- **Key Elements:**  
  - **Room Code Generator:** Unique 6-digit code for hosts.  
  - **Lobby List:** Avatars of joined players (max 4 for 2v2).  
  - **Start Match Button:** Host-only.  
  - **Copyable Invite Link.**  

---

### **6. Game Screen**
- **Purpose:** Core domino gameplay interface.  
- **Key Elements:**  
  - **Domino Table:** Cuban-themed design (Havana café/street art).  
  - **Player Hands:** Tile display (drag-and-drop functionality).  
  - **Scoreboard:** Real-time points, turn indicator, CDS preview.  
  - **Chat Panel:** Ephemeral text/GIFs (disappears post-match).  
  - **Pass Button:** Auto-highlighted when no valid moves.  
  - **Timer:** 30-second countdown per turn.  
  - **Disconnection Handling:** AI takeover after 2 minutes.  

---

### **7. Match Result Screen**
- **Purpose:** Post-game summary and progression.  
- **Key Elements:**  
  - Final score and CDS change (+/- points).  
  - Achievements Unlocked: Badges (e.g., *“First Pollona!”*).  
  - Rematch Button: Quick restart with same players.  
  - Share Results: Social media or direct link.  
  - Navigation to Dashboard or History.  

---

### **8. Match History Screen**
- **Purpose:** Review past games and performance.  
- **Key Elements:**  
  - **Recent Matches List:** Date, participants, final score.  
  - **Detailed View:**  
    - Round-by-round breakdown (points, tiles left).  
    - Special plays (Capicua, Viajeras).  
  - Filter by mode (1v1/2v2) or outcome (win/loss).  

---

### **9. Leaderboard Screen**
- **Purpose:** Track global and personal rankings.  
- **Key Elements:**  
  - **Top 10 Players/Teams:** CDS, wins, Pollonas.  
  - **User Rank:** Current position and tier (e.g., *#45 Bronze*).  
  - **Search Bar:** Find friends or rivals.  
  - Toggle between 1v1 and 2v2 leaderboards.  

---

### **10. Settings Screen**
- **Purpose:** Manage app preferences.  
- **Key Elements:**  
  - **Theme:** Dark Mode toggle with Cuban color palettes.  
  - **Notifications:** Match invites, CDS updates.  
  - **Language:** English/Spanish switch.  
  - **Account Management:** Delete account, privacy policy.  

---

### **11. Error/404 & Loading Screens/Splash Screen**
- **Purpose:** Handle invalid routes or delays.  
- **Key Elements:**  
  - **404 Screen:** Cuban domino-themed artwork + *“¡Oops! Page not found.”*  
  - **Loading Spinner:** Animated domino tile + tip (e.g., *“Did you know? Capicua means ‘palindrome’ in Cuban slang.”*)  

---

## **Key Technical Considerations**
- **Responsive Design:** Optimized for desktop and mobile (collapsible menus on smaller screens).  
- **Real-Time Sync:** WebSocket (Socket.io) for live gameplay and chat.  
- **Performance:** Lazy loading for match history and leaderboards.  
- **Security:** End-to-end encryption for private matches and user data.  

---

## **Rationale**
- Prioritizes *Must-Have* features from MoSCoW (core gameplay, CDS, Cuban theming).  
- Balances simplicity for casual players with depth for competitive users (toggleable stats).  
- Lays groundwork for future expansions (AI, tournaments) via modular design.  

This structure ensures a polished MVP that honors Cuban culture while delivering a seamless, competitive domino experience. 🎲🇨🇺
```
