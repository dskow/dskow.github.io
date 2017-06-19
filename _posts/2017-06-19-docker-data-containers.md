---
layout: post
title: Containers in Docker
---

# Storing Data from Docker containers

To have data last after removing its container, the data needs to be located in a volume.  The volume hides the original folder similarly to how a unix directory softlink hides the original directory.  This hiding behavior is also seen in a Dockerfile which can cause other lines in the file to fail.  So, don't create a volume of a directory that the Dockerfile modifies.

There are two ways of storing data (but really it's all stored on the host).  They can be used multiple times and both in the same container.

### To Specific Host Folders

This type of container uses the pattern `-v /host/folder:/container/folder:ro` pattern during the create or run command. The paths have to be absolute paths. The ro option overrides the defaul read-write to make the volume read-only in the container.

The propagation of this type of volume is rprivate.

### To Volumes from another container

A data-only container method is a method of storing container data in another container instead of inside the original contain or on the host.
The syntax to use this type of container is `--volumes-from mycontainer-data` pattern.  It will pull in all of the volumes in the container.

The propagation of this type of volume is not set.
# See the Actual Host Location

To see the actual location, use the docker inspect command and look for the Mounts section.

```
docker inspect fac362394230948234092384092380535
```

```json
Mounts": [
     {
         "Name": "fac362...80535",
         "Source": "/var/lib/docker/volumes/fac362...80535/_data",
         "Destination": "/webapp",
         "Driver": "local",
         "Mode": "",
         "RW": true,
         "Propagation": ""
     }
 ]
 ```

The Source is the hold location and Destination is the contain location.
