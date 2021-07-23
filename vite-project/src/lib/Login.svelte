<script>
    import { supabaseClient } from './supabaseClient.js'
	import { storedUser } from './stores.js'
    
    let currentUser;

    async function signup() {
    const { user, session, error } = await supabaseClient.auth.signUp({
        email: 'example7@email.com',
        password: 'example-password7',
        })
        console.log(user)
    login()
    }

    async function  login() {
         const { user, session, error } = await supabaseClient.auth.signIn(
        {
        email: 'example@email.com',
        password: 'example-password',
        })
        $storedUser = (user.email)
        currentUser = (user.email)
        console.log(user.email)
        if (error) alert(error.message)
    }

    async function logout() {
        const { error } = await supabaseClient.auth.signOut()
        currentUser=null
		$storedUser = null
    }
</script>

{#if currentUser}
    <p>{currentUser}</p>
    <img src={currentUser.photoURL} alt={'User photo'} />
    <p><button class='bg-red-300' on:click={logout}>Logout</button></p>
{:else}
    <button class='bg-red-300' on:click={login}>Login</button>
{/if}
