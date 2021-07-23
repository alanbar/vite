import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xhmdomzfkdzubmczhklr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzQyMDM0MywiZXhwIjoxOTMyOTk2MzQzfQ.07Ny6lG4cigH5-yiZI5jYPOLXxJzk1vha5S6Dvw6usc";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
