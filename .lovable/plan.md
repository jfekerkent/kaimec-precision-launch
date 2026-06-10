## Plan: Robot avatar for Kaimec chat agent

Replace the generic `MessageCircle` icon on the floating chat button and add a matching avatar in the chat header so the agent has a clear visual identity.

### Steps
1. Generate a robot mascot image (friendly industrial-style robot head, transparent PNG on clean background, matching the brand's `#F5A623` / dark `#1a1a1a` palette) and save to `src/assets/chat-robot.png`.
2. Update `src/components/chat/KaimecChatAgent.tsx`:
   - Import the new image.
   - Replace the `MessageCircle` icon inside the closed floating launcher button with an `<img>` of the robot (keep the round orange button, button size, position, and aria-label unchanged).
   - Add a small circular robot avatar next to the "Kaimec Product Expert" title in the open chat header.
3. No other files, routes, EmailJS, or chat logic touched.

### Open question
Do you want the robot to fully replace the orange circular button (image-only, no background), or keep the orange circle with the robot inside it (current style, just swap the icon)? Default if unspecified: keep the orange circle with the robot inside.
