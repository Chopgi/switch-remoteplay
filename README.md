This is an independent project. I need to research and learn various aspects to implement my envisioned features and changes for this project. 

Any and all ideas, suggestions, help and advice are greatly appreciated.

Huge thanks to all original authors and contributers of projects mentioned. 
# Goals
* Make remoteplay work using NXBT/NUXBT's API instead of joycontrol due to its old dependencies complicating the process of making joycontrol work smoothly.
* Discover/replace the use of Mixer's FTL for streaming switch output (or at the least understanding how this is implemented and intended to function)
* Create a simple way for multiple users to remotely play on a single Nintendo Switch.
* Provide a simple way to access and control a Nintendo Switch remotely.
# Notes and Discoveries
I've gotten NUXBT to work with switch 1 and 2 on my desktop, using the built-in Intel(R) Wi-Fi 6 AX200 160MHz wireless card on my motherboard. I was able to control either switch with a small bit of latency. Regardless of latency, NUXBT worked.

I also managed to get joycontrol to work on a seperate laptop, however, it only connected to and worked with the switch 1. This was on an installation of cachyos (arch-based distro), using pyenv to set the shell I was working in to use python 3.12, and forcing pip to instal missing dependencies using --break-system-packages.

On the same laptop using cachyos, I installed NUXBT using pyenv to set the shell to python 3.12 and (if I remember correctly) sudo pipx install nuxbt to finally install it. On the laptop, it worked flawlessly (still a small bit of latency) with the switch 1, and even connected to the switch 2. However, the switch 2 would disconnect after a while, with the webapp stating that the controller crashed, forcing me to re-pair to reconnect. 

A colleague of mine managed to install the .rpm for NUXBT on their laptop, also running cachyos, through the use of Distrobox. Dispite not having access to a switch, they were still able to see "pro controller" on their android phone when scanning for bluetooth devices available to connect to.

[GBATEMP thread on getting NXBT to work](https://gbatemp.net/threads/how-to-install-and-use-nxbt-switch-1-and-switch-2-supported.676535/)

[Typenoob's NXBT fork](https://github.com/typenoob/nxbt), mentioned in the GBATEMP thread

## Repos of Note
* [Dippyshere's CaptureViewer](https://github.com/dippyshere/CaptureViewer) (low-latency HDMI capture viewer for Windows
### Possible Joycontrol Replacements
* [NUXBT](https://github.com/hannahbee91/nuxbt) (what I plan to implement)
* [Poohl's fork of joycontrol](https://github.com/Poohl/joycontrol) (revamp of Mart1nro's original joycontrol)  
  * ### based on Poohl's fork:
  * [Exkuretrol's fork of joycontrol](https://github.com/exkuretrol/joycontrol/tree/modify-the-project-to-modern-pythonos-capatible) (Potentially vibe-coded)
  * [EgestiaN's fork of joycontrol](https://github.com/EgestiaN/joycontrol) (vibe-coded, requires tweaks)
  * [Francescde's fork of joycontrol](https://github.com/Francescde/joycontrol/tree/amiibo_edits) (primarily used for macros, tested on Raspberry Pi)


## My NUXBT Setup
I used VMware Workstation 25.0.1.25219725, which was already installed on my desktop (AM4 processor, 32GB DDR4 RAM) and created a virtual machine using an Ubuntu v24.04.4 iso [(ubuntu-24.04.4-desktop-amd64)](https://cofractal-ewr.mm.fcix.net/ubuntu-releases/24.04/). I followed the Easy Install options, which resulted in a VM with 4GB of memory, 2 processors, a disk size of 20 GB, a USB controller (in hardware), and (I believe I manually set this) a network adapter set to bridged mode. Afterwards, I followed the Ubuntu install process and chose Extended selection in the applications section. I did not opt to install third-party/proprietary "software for graphics and WI-FI hardware."  

After the installation concluded, I restarted the VM and connected my bluetooth adapter by clicking on the bluetooth icon and selecting connect to VM.

I then tried to add the NUXBT PPA to my system as stated in the installation, however, the terminal would either return a timeout or connection refused error. In response, I tied following the top three answers in [this Stack Exchange](https://askubuntu.com/questions/38021/how-to-add-a-ppa-on-a-server) thread. I ended up manually editing the VM's `/etc/apt/sources.list` file, appending NUXBT's [PPA links](https://launchpad.net/~hannahbee-0602/+archive/ubuntu/nuxbt) and then running `sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 9af6a54b9f9dba3ad006c4c48ddcb6f361c8c51d` , followed by `sudo apt-get update`.

This did not make the PPA work, though I am unsure if it is user error or if the recent Canonical DDOS attacks affected my ability to reach launchpad.net (or other canonical services).

After failing to make the PPA work, I downloaded the .deb file for the v3.2.1 release of NUXBT. I changed my directory to the Downloads folder (`cd Downloads/`) and ran the provided install command from the installation instructions (`sudo apt install ./nuxbt_*.deb`).

NUXBT was installed and appeared as a command in my terminal. After running NUXBT toggle, I ran NUXBT test and prepared my switch 1 to connect by opening the Change Grip/Order Menu. Once the switch was on the menu, I continued in the terminal by pressing enter. NUXBT connected to the switch after a few seconds, and performed its test, finishing successfully.

I then tried running the same NUXBT test command with the switch 2, which worked flawlessly as well.

The NUXBT webapp worked for either switch, and I continued my testing with the switch 2 (as I knew the switch 1 would have a much high chance of success, I was curious regarding switch 2 compatibility). 

To access the webapp on my Windows machine (that was hosting the VM), I disabled the VM's firewall using `sudo ufw disable` and accessed the VM's ip (found in the output of `ip address`) using port 8000. The browser I use is Opera GX, and I went to `http://IPADDRESSOFVM:8000` in the navigation bar. I was able to successfully access the webapp on the host Windows machine, with no noticble difference in latency. Side note, up to this point I had the Switch 2 docked, and connected to an additional monitor via HDMI.

Searching for a quick and easy method to share access to the VM's local IP address without port forwarding, I discovered Ngrok. I made an account and ran their commands for installation via APT (provided once you login on their website). Finishing setup, I added my authtoken with their provided command. Then, I ran `ngrok http 8000` in a seperate terminal, which provided me with an internet address to access the webapp with. I confirmed the funcionality of the ngrok address by opening it in the host Windows machine, which worked without issue. 

I then sent the link to a friend, instructing them to connect a controller to their computer before visiting (they stated it was a generic xbox controller, which likely used standard XInput). I called them via Discord, setting the Switch 2's HDMI output to my capture card (Vivitar Capture Card model VIVRW7310), and using the output as my "camera" in the call. They stated they had around "5ish" seconds of latency, I have not yet tested if streaming the captured output would reduce latency. Regardless, the capture card natively had around a second of latency, comparing capture to raw output.

After around 20 minutes, the ngrok website went offline, and upon checking the VM to troubleshoot, it was extremely slow and unresponsive to the point of being able to login (in less than 10 minutes). Multiple factors could have caused the VM to slowdown. I could have hit a bandwidth limit with ngrok, the finished queue in input.py could have grown too large (see [#49](https://github.com/hannahbee91/nuxbt/pull/49)), or the VM simply could have ran out of resources due to the small amount of CPU cores and memory allocated to it. After encountering this slowdown, I shutdown the VM and created a savestate.

## Potential Improvements
* Ideas to Decrease Latency
  > (So far, I've only tested a discord call using my capture card as my camera & hosting NUXBT online through the use of ngrok to open port 8000)
  * Lower-latency capture card
  * Figure out a faster method for the host (server) to recieve communication (such as deciding between WebRTC/websocket)([#39](https://github.com/hannahbee91/nuxbt/pull/39)/[#46](https://github.com/hannahbee91/nuxbt/pull/46)/[Dippyshere's NUXBT fork](https://github.com/dippyshere/nuxbt) could provide insight)
  * Using wired communication instead of bluetooth for communication
    * This would involve a microcontroller for communcating with the switch, and replace NUXBT or work alongside it.  (Using something similar to pokemon automation's use of esp32-s3 or like yvbbrjdr's procon)
    * This would also allow for the combination of a bluetooth adapter and microcontroller to have two online controllers, avoiding potential wireless interference from multiple bluetooth adapters
  * Overall improve ease-of-use and setup
    * Updating compatibility with modern versions of dependencies (if any, due to RFlintstone's upgrades)
    * Webapp appearance & customizability
* Discover a reliable and (preferably) free method of hosting the webapp and stream to the internet securely
    * I will need to research, learn and understand reverse proxies properly
    * I want to avoid exposing the host completely to the internet as well as (potentially) avoiding port forwarding
  
# Original README:
# Switch Remote Play

| Tests | ![Server](https://github.com/juharris/switch-remoteplay/workflows/Server%20Test/badge.svg) | ![Client](https://github.com/juharris/switch-remoteplay/workflows/Client%20Test/badge.svg) |
| - | - | - |

The goal of this project is to support **easily** playing your Nintendo Switch remotely or locally via another device with a keyboard/mouse/controller/touchscreen.
No hacking of your Switch is required.

Setup:
```
You <===> Website <=====> Server <--Bluetooth--> Switch
            ^                                      |
            |                            video capture via HDMI
            |                                      |
            |                                      v
            '------------------------------ Streaming Server
```                                           

Example [video](https://youtu.be/EIofCEfQA1E) of someone playing my Switch **from another city**.

Example [video](https://youtu.be/TJlWK2HU8Do) of me using an **Xbox controller (that does not have Bluetooth)** to play my Switch.

Example [video](https://youtu.be/viv-B_A-A2o) of recording and running a **macro**.

For more videos, check out this [playlist](https://www.youtube.com/playlist?list=PLfC95bU1D4gpJEM3SYfzaI2e5vD0q7v0z).

# Status
One keyboard layout, gaming controller layout, using you mouse, or touchscreen is supported to map input to the control sticks and the buttons on a Nintendo Switch controller.
I've mainly tested this with Animal Crossing and Mixer - FTL low latency streaming.

# Macros
You can record and run **macros**!
You do not need your Switch's video going through your PC to record and run macros.
Just setting up the server (Linux device with Bluetooth) to send commands via Bluetooth to your nearby Switch is enough.
Then you can record, modify, manage, and **play** your macros from a PC or even your phone.

See the supported commands [here](/server#api).

# Requirements
The host (person setting this up) needs:
* A Nintendo Switch
* A **Linux** machine to host the service and connect via Bluetooth to the Switch (tested with a Raspberry Pi 4B) (a Linux machine is required by the code that actually connects to the Switch via Bluetooth: [joycontrol][joycontrol]). See the [server page](/server) to learn how to set this up.
* (optional) A video capture card to see the video (or just have bad quality and lag by pointing your camera at your Switch and use a video chat app)

The client (your friend) needs:
* A web browser to open the client and send commands
  * You can use the already [hosted client][client] but you may have to enable mixed content for that site in your browser's settings if the server your friend is hosting to connect to their Switch does not use SSL (a link that starts with https).
* A keyboard or **gaming controller** is recommended or just use your mouse/touchscreen for simple stuff
* (optional) See [this folder](/website-client) if you want to customize or run your own client

# Plans
* Support custom key bindings.
* Improve macro support: exporting/importing.
* Default layout options for common controllers.
* Default key binding options for keyboard/mouse for certain games.
* Loadable and exportable key binding configurations.
* Support different streaming services (Mixer - FTL with low latency is supported).
* See [enhancements](https://github.com/juharris/switch-remoteplay/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement) and [help wanted](https://github.com/juharris/switch-remoteplay/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)

# Looking for Help
I'm looking for help with implementing the above plans. Some more specific things:
* Add security options to the service: auth, allowed origins, disabling buttons like Home and screen capture, limiting the number of clients connected.
* Getting the service to run on Windows (hard since the libraries I'm relying on require Linux)
* Improve macro support: a nicer editor
* Improving the client UX
* Mapping controller, keyboards, and mice for game specific controls (once custom bindings are supported)
* Phone apps to talk to the Switch and host the service instead of the a Linux machine.

# Acknowledgements
A very special thank you to [joycontrol][joycontrol] for the very conveninent and full API and the acknowledgements there as well for so much of the great research into how to communicate with the Switch.

[client]: https://jubuntu.eastus.cloudapp.azure.com
[joycontrol]: https://github.com/mart1nro/joycontrol
