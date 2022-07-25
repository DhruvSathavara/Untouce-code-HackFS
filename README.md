# Untouched Archive

### Decentralised and Censorship resistant Archive platform
Upload Books, Historical Websites, Documentries and News Papers.

![MicrosoftTeams-image (1)](https://user-images.githubusercontent.com/96543964/180704870-82123ffc-5063-439e-8f61-a825958358a7.png)

## Problems :
Currently, Archive.org is a widely used platform we all have used for different purposes but there are limitations due to its centralized structure so if there is a decentralized and censorship-proof archive platform then it can add lot many benifits. 

**1. Centralized data storage:** There is always a chance of a central point of failure no matter entity is nonprofit organization or a company.

**2. No way to incentivize contributors:** From books and newspapers banned due to conspiracy issues to documentaries, contributors are publishing everything to help community but there is no incentive mechanism for them.

**3. Censorship issues:**  From centralized database and control, content can be taken down.

## Solution 

Untouched Archive - is a decentralized and censorship proof solution to archive.org for the community to store Books, Newspapers, Documentaries, and historical Web pages on persistent storage powered by Filecoin - IPFS.

## Upload Books, Documents, Newspaper and Websites Snapshots

### Upload Form

![screenshot (1)](https://user-images.githubusercontent.com/96543964/180705593-1c0c8f67-33b6-4a3d-a30e-8297203e7b0d.png)


![3t](https://user-images.githubusercontent.com/96543964/180705713-06a83740-faf6-4e4e-942d-ee60f70176ab.png)


![2](https://user-images.githubusercontent.com/96543964/180705945-aa7786d2-e3a2-4f5a-b538-6e7ae89b4272.png)

### Contribute

![screenshot (2)](https://user-images.githubusercontent.com/96543964/180706201-fb998c52-6d0a-462e-afab-1c02eacc11cd.png)

![screenshot (5)](https://user-images.githubusercontent.com/96543964/180707323-ea5f6c3e-f9c8-4b85-82ce-3f6dcabcc919.png)

### Read Online & Download

![screenshot (4)](https://user-images.githubusercontent.com/96543964/180706933-12fefc5e-3d04-4fc5-80f6-3b2bef7e383d.png)

### IPFS & Filecoin

https://github.com/DhruvSathavara/Untouce-code-HackFS/blob/master/Filecoin.md

```
  function addData(Item) {
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "data.json"),
        ];
        return files;

    }
    async function storeFiles(Item) {
        var array = [];

        // TO GET CURRENT USER WALLET ADDRESS
        let currentUser = login()
        const Cuser = Moralis.User.current(currentUser)
        UntoucheDdata.set("Current_User", user)


        let files = addData(Item)
        const cid = await client.put(files);
        UntoucheDdata.set("CID", cid);
        UntoucheDdata.save();
        axios.get(`https://${cid}.ipfs.infura-ipfs.io/data.json`)
            .then(function (response) {
                array.push(response.data);
                setData(array);
            })
            .catch(function (error) {
            })

        return cid;
    }

```




