# Where are the cats?!

### The problem
We have two very naughty little cats, who are in and out at all hours of the day. My partner gets quite distressed by their comings and goings, especially when they are out all night. I wanted to create some kind of solution which allows us to know whether the cats are in or out, without having to search all over the house for them.

### The solution
Enter `cat-track`! `cat-track` is a very lean web page which allows us to see whether the cats are in or out of the house. It consists of an Express.js server which serves ip some static HTML with the cats on. It is updated through a REST API, which will be (when I can get hold of the bits) called by a device attached to the cat flap. 

The flap client will scan the microchip in the cat's neck to establish which cat is using the cat flap, and then take input from a limit switch to discern whether the cat is going in, or coming out. It will then call the API endpoint to update the state in the server, which is stored in a LowDB JSON file. The frontend is updated via WebSockets to ensure the latest status is always being displayed.

The whole thing is containerised and runs on a Docker instance on a VPS I was already using for something else.

### What I learned

* Despite this being a very small project, it taught me a lot about the infrastructure side of this kind of thing, with my first real introduction to CD. 
* I also learned a lot about nginx through setting this up on an existing server.
* I haven't used WebSockets for anything since initially learning about them and it was fun to find a use case for this.

### Technologies used
* node.js
* express.js
* Docker
* nginx
