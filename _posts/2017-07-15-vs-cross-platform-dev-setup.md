# Background

This guide will discuss how to setup a development environment for build
mobile apps with Visual Studio, Xamarin.

# Resources

You will need a Windows 10 Creators edition computer, a current macbook
computer with latest IOS, and network access on both.

Launch VS2017 setup.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image1.png" width="624" height="348" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image2.png" width="624" height="348" />

Under Workloads, choose “Mobile Development with .NET” title. It also
says, “Build cross-platform applications for iOS, Android, or Windows
using Xamarin”.

That will get you:

1.  Xamarin,

2.  .NET Framework 4.6.1 development tools,

3.  C\# and Visual Basic,

4.  .NET Portable Library targeting pack,

5.  Xamarin Workbooks,

6.  Android NDK (R13B),

7.  Android SDK Setup (API level 23),

8.  Java SE Development Kit (8.0.1120.15),

9.  Google Android Emulator (API level 23),

10. F\# language support,

11. Intel Hardware Accelerated Execution Manager (HAXM),

12. Windows 10 Mobile Emulator (Creators Update),

13. Universal Windows Platform tools for Xamarin.

To get the emulators for windows phone and android phone, you will need
to remove the HAXM options. The Hyper-V method describe below works for
both windows and android phone emulation. The default HAXM method only
works for Android phone emulation. The iphone emulator only runs on the
macbook, but it can be deployed and launched from Visual Studio 2017 on
the windows machine.

Uncheck the boxes for (saves 20GB of space):

1.  Google Android Emulator (API level 23),

2.  Intel Hardware Accelerated Execution Manager (HAXM),

Check the boxes for:

1.  Windows 10 Mobile Emulator (Creators Update),

2.  Universal Windows Platform tools for Xamarin,

3.  Visual Studio Emulator for Android.

If you want to store on GitHub select that under individual components.

1.  GitHub extension for Visual Studio

If you want Windows 10 emulator select the Universal Platform
Development

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image3.png" width="453" height="106" />

This will include the following:

1.  Blend for Visual Studio,

2.  .NET Native,

3.  NuGet Package Manager,

4.  Universal Windows Platform tools,

5.  Windows 10 SDK (10.0.15063.0) for UWP: C\#, VB, JS.

You can always install components again. Just run the setup app again.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image4.png" width="624" height="348" />

This will take a while. I installed the Android Emulator Manager at the
same time. While VS2017 setup was in the acquiring phase.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image5.png" width="624" height="348" />

# Install Android Emulator Manager

The Android Emulator Manager (AEM) controls the installation of the
various android phone emulators for Hyper-v. In the Visual Studio 2017
Setup, you will need to download and install the android emulator on
Hyper-v (437MB). Hyper-v is microsoft’s visualization manager. It is
similar to Oracle’s VirtualBox, and VMware.

see <https://www.visualstudio.com/vs/msft-android-emulator/>

After you install the AEM, you’ll need to launch it and install the
emulator for testing your app.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image6.png" width="617" height="864" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image6.png" width="617" height="864" />

This installs within a few minutes.

Start the Android Emulator.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image7.png" width="395" height="150" />

Choose API 23

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image8.png" width="624" height="587" />

Click the download button to right of 5.7” Marchsmallow … list item.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image9.png" width="624" height="89" />

This will take a while to download. A dialog access window will appear
late in the install to do the actual install.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image10.png" width="623" height="66" />

Click the green play button to start it.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image11.png" width="624" height="86" />

By default there is no internet access.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image12.png" width="333" height="592" />

# Turn on internet access for emulator

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image13.png" width="387" height="104" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image14.png" width="428" height="171" />

If you are still running the emulator stop it by closing the window.

# Create an Internet connection

In hyper-v, right click your computer and choose Virual Switch Manager,

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image15.png" width="448" height="170" />

Click Create Virtual Switch and give it a name like “Internet Virtual
Switch”. Click yes to warning.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image16.png" width="527" height="384" />

Right click the one that was running and choose settings.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image17.png" width="450" height="191" />

In the Add Hardware section, select Network Adapter and Add.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image18.png" width="436" height="97" />

Choose Microsoft Emulator NAT Switch and OK.

Relaunch emulator and verify internet.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image19.png" width="485" height="864" />

Start VS 2017 for first time and sign in.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image20.png" width="391" height="480" />

Choose the Team Explorer Tab in lower right corner of main window.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image21.png" width="350" height="155" />

They show a welcome message. Welcome to GitHub for Visual Studio! Why
not take a look at our training or documentation?

The training link is
<https://services.github.com/on-demand/windows/visual-studio>

And the documentation link is
<https://github.com/github/VisualStudio/tree/master/docs>

After logging into a GitHub project to store your app, click new
solution.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image22.png" width="624" height="432" />

Choose the 4.6.2 Framework, Cross Platform App(Xamarin) and give it a
name.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image23.png" width="624" height="342" />

Choose either Shared Project or PCL. The difference is PCL creates a dll
that is used in the other projects. Shared project shares the code with
the other projects. If you want to use skiasharp and match closely with
the Skiasharp demo code, Skiasharp uses PCL.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image24.png" width="624" height="451" />

You will need to allow access for VS2017 program to the network.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image25.png" width="303" height="158" />

Install any updates that appear in Notifications. This update required
me to close VS for it to install.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image26.png" width="624" height="472" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image27.png" width="624" height="472" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image28.png" width="601" height="127" />

Choose File-&gt;New-&gt;Project…

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image29.png" width="624" height="254" />

The created project will contain four projects.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image30.png" width="346" height="179" />

You should be able to build and run each on the emulators.

# Windows Phone Emulation

The Windows Phone will look like this.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image31.png" width="624" height="44" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image32.png" width="624" height="331" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image33.png" width="624" height="454" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image34.png" width="320" height="569" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image35.png" width="322" height="569" />

# iPhone Emulation

The iPhone will look like this.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image36.png" width="563" height="42" />

Then look on your macbook. The emulator should appear and the app should
have the following.

To Save a screen shot, select File-&gt;Save ScreenShot. Then yous scp to
securely copy the file from the macbook to the windows computer. The
command is from windows powershell. You will need bash for Windows
installed.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image37.png" width="325" height="578" />

# Android Phone Emulation

The Android Phone will look like this.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image38.png" width="623" height="39" />

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image39.png" width="434" height="213" />

When running the Android emulator, a warning about internet connection
will appear. Click Yes.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image40.png" width="333" height="592" />

# Installing Bash for Windows

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image41.png" width="624" height="553" />

Reboot computer.

Run bash from command line.

<img src="https://github.com/dskow/dskow.github.io/blob/master/_posts/media/image42.png" width="624" height="354" />

Use the secure copy command to copy the screenshot from the macbook to
the windows computer.

scp davidskowronski@192.168.1.2:~/Desktop/\*.png
/mnt/c/Users/david/Pictures/

Here is the full output of what to expect.

david@D:/mnt/c/Users/david$ scp
davidskowronski@192.168.1.2:~/Desktop/\*.png
/mnt/c/Users/david/Pictures/

The authenticity of host '192.168.10.9 (192.168.10.2)' can't be
established.

ECDSA key fingerprint is SHA256:…

Are you sure you want to continue connecting (yes/no)? yes

Warning: Permanently added '192.168.1.9' (ECDSA) to the list of known
hosts.

Password:

Simulator Screen Shot Jul 12, 2017, 4.03.56 PM.png 100% 467KB 466.9KB/s
00:00

Simulator Screen Shot Jul 15, 2017, 5.52.55 PM.png 100% 156KB 155.8KB/s
00:00
