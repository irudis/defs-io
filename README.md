<p align="center">
  <img src="https://github.com/user-attachments/assets/5986e604-666b-4840-8566-415c6cedb62d" width="150" height="150"/>
</p>

<h1 align="center"><b>Defs-IO. Farm. Build. Protect.</b></h2>

VkMiniApps-based multiplayer game where you should build base that must be protected by your weapon and other defence buildings.

You are with nothing. No resources. No base. No safety.
Find resources, build base and just wait night. They will come.

<br/>
<img src="https://github.com/user-attachments/assets/2ee3575e-eb18-42ec-bbe1-8d3f2d7726fe" width="400"/>
<br/>
<img src="https://github.com/user-attachments/assets/a09273f6-9207-4108-b637-e7bb5b973c42" width="400"/>
<br/>

![image](https://github.com/user-attachments/assets/3cf439f3-1e1b-4d32-98c3-9c39c2a8b6d0)

<hr/>
<h2>What used?</h2>

```
NodeJS. Base for server side.
 Redis. Save player's progress and leaderboard.
 WebSocket ("ws" lib) + Protobuf ("protobufjs" lib). In-game transfer protocol(and protobuf to take less traffic).
 ...and little more for simple collision processing
```
```
VueJS. Base for client side.
 PixiJS. Game renderer.
```
