This guide will discuss how to setup a development environment for building
mobile apps with Visual Studio and Xamarin.

# Resources

You will need a Windows 10 Creators edition computer, a current macbook
computer with latest iOS 10.3, and network access on both.  You may have to install JDK 8 before VS2017. JDK8 is used in the macbook agent.

Launch VS2017 setup.

<img src="https://dskow.github.io/media/image1.png" width="624" height="348" />

Select the “Mobile Development with .NET” and "Universal Windows Platform development" workloads.

<img src="https://dskow.github.io/media/image2.png" width="624" height="348" />

“Mobile Development with .NET” will get you:

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

<img src="https://dskow.github.io/media/image3.png" width="453" height="106" />

"Universal Windows Platform development" will get you:

1.  Blend for Visual Studio,
2.  .NET Native,
3.  NuGet Package Manager,
4.  Universal Windows Platform tools,
5.  Windows 10 SDK (10.0.15063.0) for UWP: C\#, VB, JS.

Don't use HAXM. The Hyper-V works for both windows and android phone emulation. The default HAXM method only works for Android phone emulation. The iphone emulator only runs on the macbook, but it can be deployed and launched from Visual Studio 2017 on
the windows machine. Iphone emulator requires matching versions between Visual Studio and the Macbook Xamarin software.

Uncheck the boxes for:

1. Google Android Emulator (API level 23),
2. Intel Hardware Accelerated Execution Manager (HAXM),

Check the boxes for:

1. Windows 10 Mobile Emulator (Creators Update),
2. Universal Windows Platform tools for Xamarin,
3. Visual Studio Emulator for Android,
4. Windows 10 SDK (10.0.10586.0),
5. GitHub extension for Visual Studio

The 10.0.10586.0 module matches the default minimal version used in the VS project wizard.

You can always install components again. Just run the setup app again.

<img src="https://dskow.github.io/media/image4.png" width="624" height="348" />

<img src="https://dskow.github.io/media/image5.png" width="624" height="348" />

# Using Android Emulator Manager

The Android Emulator Manager (AEM) controls the installation of the
various android phone emulators for Hyper-v. When you install one from the manager, it will appear in the Visual Studio dropdown. Hyper-v is microsoft’s visualization manager. It is similar to Oracle’s VirtualBox, and VMware.  I don't think they work together so you may have to uninstall those to get hyper-v working.

see <https://www.visualstudio.com/vs/msft-android-emulator/>

1. Install the emulator for testing your app.

<img src="https://dskow.github.io/media/image6.png" width="617" height="864" />

This installs within a few minutes.

2. Start the Android Emulator

<img src="https://dskow.github.io/media/image7.png" width="395" height="150" />

3. Filter the Device Profiles by choosing Marshmallow API 23 which is the most current that the manager has.

<img src="https://dskow.github.io/media/image8.png" width="624" height="587" />

4. Click the download button to right of 5.7” Marshmallow.

<img src="https://dskow.github.io/media/image9.png" width="624" height="89" />

This will take a while to download. A dialog access window will appear late in the install to do the actual install.

<img src="https://dskow.github.io/media/image10.png" width="623" height="66" />

5. Click the green play button to start it.

<img src="https://dskow.github.io/media/image11.png" width="624" height="86" />

By default there is no internet access in the emulator.

# Internet access for emulator

You may need to run you emulator and have it talk to the internet.

1. Verify that there is no internet in the emulator by trying the browser.

<img src="https://dskow.github.io/media/image12.png" width="333" height="592" />

2. Search for Hyper and run the Manager.

<img src="https://dskow.github.io/media/image13.png" width="387" height="104" />

3. If you are still running the emulator stop it by closing the emulator window.

<img src="https://dskow.github.io/media/image14.png" width="428" height="171" />

4. In hyper-v, right click your computer name and choose Virual Switch Manager,

<img src="https://dskow.github.io/media/image15.png" width="448" height="170" />

5. Click Create Virtual Switch and give it a name like “Internet Virtual Switch”. Click yes to warning.

<img src="https://dskow.github.io/media/image16.png" width="527" height="384" />

6. Right click the emulator virtual machine that was running in hypter-v and choose settings.

7. In the Add Hardware section, select Network Adapter and Add.

<img src="https://dskow.github.io/media/image17.png" width="450" height="191" />

8. Choose Iternet Virual Switch and OK.

<img src="https://dskow.github.io/media/image18.png" width="436" height="97" />

9. Relaunch the emulator and verify internet.

<img src="https://dskow.github.io/media/image19.png" width="485" height="864" />

# Run Visual Studio

The first time starting Visual Studio 2017 will ask for an account which will:

1. Provide the licensing of the versions of Visual Studio Professional and higher,
2. Link your Visual Studio to visual studio online,
3. Link your Visual Studio to github.


<img src="https://dskow.github.io/media/image20.png" width="391" height="480" />

Choose the Team Explorer Tab in lower right corner of main window.

<img src="https://dskow.github.io/media/image21.png" width="350" height="155" />

Welcome to GitHub for Visual Studio! Why not take a look at our training or documentation? The training link is <https://services.github.com/on-demand/windows/visual-studio> and the documentation link is
<https://github.com/github/VisualStudio/tree/master/docs>

After logging into a GitHub project to store your app, click new solution.

<img src="https://dskow.github.io/media/image22.png" width="624" height="432" />

Choose the 4.6.2 Framework, Cross Platform App(Xamarin) and give it a name.

<img src="https://dskow.github.io/media/image23.png" width="624" height="342" />

Choose either Shared Project or PCL. The difference is PCL creates a dll that is used in the other projects. Shared project shares the code with the other projects. If you want to use skiasharp and match closely with the Skiasharp graphical demo code, Skiasharp uses PCL.

<img src="https://dskow.github.io/media/image24.png" width="624" height="451" />

You will need to allow access for VS2017 program to the network.

<img src="https://dskow.github.io/media/image25.png" width="303" height="158" />

Install any updates that appear in Notifications. The github plugin update required me to close VS for it to install.

<img src="https://dskow.github.io/media/image26.png" width="624" height="472" />

<img src="https://dskow.github.io/media/image27.png" width="624" height="472" />

<img src="https://dskow.github.io/media/image28.png" width="601" height="127" />

Choose File-&gt;New-&gt;Project…

<img src="https://dskow.github.io/media/image29.png" width="624" height="254" />

The created solution will contain four projects.

<img src="https://dskow.github.io/media/image30.png" width="346" height="179" />

You should be able to build and run the app on each phone emulator.

# Windows Phone Emulation

The Windows Phone will look like this.

<img src="https://dskow.github.io/media/image31.png" width="624" height="44" />

A warning about download before running may appear since the Xamarin solution wizard default settings for all cpu do not build and deploy UWP. 

<img src="https://dskow.github.io/media/image32.png" width="624" height="331" />

If you see a deploy warning, you need to modify the configuration manager.

<img src="https://dskow.github.io/media/image33.png" width="624" height="454" />

A startup window will take a while to start the emulator on the first deployment after a computer reboot.  Other deployments will happen much faster it the emulator is already running.

<img src="https://dskow.github.io/media/image34.png" width="320" height="569" />

The windows phone starter app looks like the following image.

<img src="https://dskow.github.io/media/image35.png" width="322" height="569" />

# iPhone Emulation

The iPhone will run options look like this.

<img src="https://dskow.github.io/media/image36.png" width="563" height="42" />

The macbook will contain the emulator for iPhone. The emulator should appear and the app.  To Save a screen shot, select File-&gt;Save ScreenShot. Then use scp to
securely copy the file from the macbook to the windows computer. The
command is from windows powershell. You will need bash for Windows
installed.

<img src="https://dskow.github.io/media/image37.png" width="325" height="578" />

## Getting iPhone Screenshots from the Macbook.

Use the secure copy command to copy the screenshot from the macbook to
the windows computer.

scp davidskowronski@192.168.1.2:~/Desktop/\*.png
/mnt/c/Users/david/Pictures/

Here is the full output of what to expect.

    david@D:/mnt/c/Users/david$ scp
    davidskowronski@192.168.1.2:~/Desktop/\*.png
    /mnt/c/Users/david/Pictures/
    
    The authenticity of host '192.168.10.9 (192.168.10.2)' can't be established.
    
    ECDSA key fingerprint is SHA256:…
    
    Are you sure you want to continue connecting (yes/no)? yes
    
    Warning: Permanently added '192.168.1.9' (ECDSA) to the list of known hosts.
    
    Password:
    
    Simulator Screen Shot Jul 12, 2017, 4.03.56 PM.png 100% 467KB 466.9KB/s
    00:00
    
    Simulator Screen Shot Jul 15, 2017, 5.52.55 PM.png 100% 156KB 155.8KB/s
    00:00

You now have access to the iphone screenshots in your Pictures folder.

# Android Phone Emulation

The Android Phone run options will look like this.

<img src="https://dskow.github.io/media/image38.png" width="623" height="39" />

It may warn about internet access.  Click Yes to the warning.

<img src="https://dskow.github.io/media/image39.png" width="434" height="213" />

The android starter app will look like the following image.

<img src="https://dskow.github.io/media/image40.png" width="333" height="592" />

# Installing Bash for Windows

You may need bash to transfer screenshots from the macbook.

1. There is a windows feature to install.

<img src="https://dskow.github.io/media/image41.png" width="624" height="553" />

2. A computer reboot is required.

3. Run bash from command line.

<img src="https://dskow.github.io/media/image42.png" width="624" height="354" />

# Updating and Install dependencies with NuGet

This section was added Oct 18, 2017.

Nuget is a visual studio component that will manage many of your 3rd party reference libraries. To use Nuget, right click on the solution and select "Manage NuGet packages for Solution".  Many packages are installed by default when you create a solution from a wizard.  The Xamarin.Android.Support.xxxxxx packages from the cross-platform wizard can be upgraded to 26.0.2 only if you update your visual studio to 15.4.0 (see help->about to find VS2017 version).  If you try on some earlier VS2017 version, you get a failure and rollback.
