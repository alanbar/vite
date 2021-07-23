<script>
    import { supabaseClient } from "./lib/supabaseClient.js";
    import { storedUser } from "./lib/stores.js";
    import Photo from './lib/Photo.svelte';
        
    let alldata = "";
    let newteam = "";
    let newhome = "";
    let newPhoto = "";
    let imagePath = "";
    let user = "";
    let savedfilename=""
    let savedimage = ""
  
    let url=""
    let publicUrl = ""
    let data = ""
    let error = ""
    let image=""
    
  // async function download() {
  // const { publicURL, error } = supabaseClient
  //   .storage
  //   .from('plants')
  //   .getPublicUrl('robin.jpg')
  
  //   url = publicURL
  //   console.log(url)
  //   return publicURL.length > 0 ? publicURL : 0;
  // }
  
    console.log("guestbook start");
    console.log($storedUser) ;
    
    async function handlepost(e) {
      console.log("handlepost");
      
      if ($storedUser) {
        try {
          await supabaseClient
            .from("soccer")    
            .insert([{ team: newteam, home: newhome, image: savedfilename }]);
  
          e.target.reset();
          getdata();
        } catch (error) {
          console.log("Error: ", error);
          }
      }
    }
    
    async function deletebtn(d) {
      const { data, error } = await supabaseClient.from('soccer')
                              .delete().match({ id: d });
      console.log('delete ' + d)
      getdata();
    }
  
    async function downloadImage(image) {
      try {
        const { data, error } = await supabaseClient.storage.from('plants')
                                 .download(image)
        if (error) throw error
        
        url = URL.createObjectURL(data)
        //alert(url)
        console.log('x is: ' + image)
        console.log('url is: ' + url)
        return url
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
  }
  
    async function upload(e) {
      //   .......................................................storage
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
    
       imagePath = `${file.name}`;
       console.log('resize file: ' + imagePath)
        if (window.BrowserImageResizer) {
          const blob = await window.BrowserImageResizer.readAndCompressImage(
            file,
            {
              quality: 0.8,
              maxWidth: 400,
              maxHeight: 600
            }
          );
          console.log('blob: ' + blob) 
          console.log(file.name) 
            await supabaseClient.storage.from('plants').upload(file.name, blob)
        
        } else {
          await supabaseClient.storage.from('plants').upload(file.name, file)
                }
        
        savedfilename = file.name;
  
        async function download() {
        const { publicURL, error } = supabaseClient.storage.from('plants')
               .getPublicUrl(file.name)
  
          url = publicURL
          console.log('Url is: ' + url)
          //return publicURL.length > 0 ? publicURL : 0;
        }
  }
  }
    
    async function getdata() {
      const res = await supabaseClient.from("soccer").select().then((res) => {
          alldata = res.data;
        });
      console.log('all ' + alldata);
      console.log($storedUser);
    }
    
  </script>
  
  <svelte:head>
      <script
        src="https://cdn.jsdelivr.net/gh/ericnograles/browser-image-resizer@2.1.3
             /dist/index.js">
      </script>
  </svelte:head>
  
  {#if $storedUser == "Anon"}
    <h1 class="bg-pink-500 text-center">Svelte Supabase</h1>
    <form class="bg-blue-500 text-center" on:submit|preventDefault={handlepost}>
      <input
        class="border"
        bind:value={newteam}
        placeholder="enter team"
        required
      />
      <br />
      <input
        class="border"
        bind:value={newhome}
        placeholder="enter ground"
        required
      />
      <br />
      <input class="border" type="file" accept="image/*" bind:value={newPhoto}
        on:change={upload} />
      <br />
      <button class="border bg-red-300" type="submit">Submit</button>
      <h4>.........................................</h4>
    </form>
  
    {#each alldata as x, index (x.id)}
    
      <li>{x.id} {x.team} {x.home} {x.image} 
              
        {#await downloadImage(x.image)}
          <p>loading....</p>
          {:then url}
          <img alt="avatar" src={url}  width="250" height="250" />
        {/await}
           
        <button class="h-5 px-5 m-2 text-indigo-100 transition-colors 
                       duration-150 bg-indigo-700 rounded-lg focus:shadow-outline
                       hover:bg-indigo-800"
        on:click={deletebtn(x.id)}>delete</button>
  
      </li>
    {/each}
  {/if}
  
  