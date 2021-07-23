<script>
    import { supabaseClient } from './lib/supabaseClient.js'
    import { storedUser } from './stores.js';
    

    async function insertStorage(){
    const { data, error } = await supabaseClient
        .from('avatars/avatars')
        .insert([
            { id: 'f35ddc86-7d54-4b8c-8f48-1438a4c3f096', username: 'Sam', avatar_url: 'artisan.jpg' },
        ])
        console.log('inserted storage ',)
        console.log(error)
    }
    async function getProfile(){
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('username')
    console.log(data)
    }
</script>

   {insertStorage()}
   {getProfile()}
   