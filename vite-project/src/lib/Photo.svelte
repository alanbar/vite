<script>
    import { supabaseClient } from './supabaseClient.js'
    import { storedUser } from './stores.js';
    
    export let image 
    let url=""
        
    async function downloadImage(image) {
        try {
          const { data, error } = await supabaseClient.storage.from('plants').download(image)
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
    
    </script>
    
      {#await downloadImage(image)}
      <p>loading....</p>
      {:then url}
      <img alt="avatar" src={url}  width="250" height="250" />
      {/await}
      
    
    