# Questions
If you are having problems using the APIs or have a question about IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

# Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/platform-services-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

# General Information
For general guidance on contributing to this project, please see
[this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/CONTRIBUTING_nodejs.md)

# Prerequisites
The following tools are required in order to build this project:
* Git  
    Note: on Windows, be sure to configure git's core.autocrlf setting to be `true` so that git will
    automatically checkout files on Windows using the standard Windows line-endings (CR, LF) and will
    convert back to Unix line-endings (LF) when you commit changes.  To do this, you can run this command in a shell (e.g
    Powershell, git-bash, etc.):
    ```
    git config --global core.autocrlf true
    ```
* Node.js (includes the `node` and `npm` commands) - be sure to install and use a version that is >=
the minimum version supported by the project (see [README.md](README.md)).  
    You can install Node.js directly on your computer, but it is recommended that you use a
    "node version manager" utility to install and use Node.js so that you can easily switch between versions.
    This is helpful because this project supports multiple versions of Node.js, and you might also be working in other Node.js
    projects that require a different version of Node.js than this project:
    * Linux, MacOS: [nvm](https://github.com/nvm-sh/nvm) and [n](https://github.com/tj/n) are popular 
    node version managers for Linux and MacOS
    * Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows) seems to be a popular
    node version manager for Windows.
* [Windows only]: The commands configured in `package.json` require the unix `cp` and `rm` commands.  If you are using
WSL or Cygwin, these commands should already be available to you.  However, if you are using a native Windows shell environment such as Powershell or the traditional Windows Command Prompt, then you'll need to install these commands.
One option is to install the [GnuWin32 coreutils package](https://gnuwin32.sourceforge.net/packages/coreutils.htm).

Windows users might find it more convenient to use
[`Windows Subsystem for Linux (WSL)`](https://learn.microsoft.com/en-us/windows/wsl/about)
or [`Cygwin`](https://www.cygwin.com/) when making contributions to this project.

# Updating an existing service within the SDK
For instructions on updating an existing service within the SDK, please see [update_service.md](update_service.md)

